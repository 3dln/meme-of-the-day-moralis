//MORALIS CLOUD FUNCTIONS

//NAME: fetchById
//INPUT: id, TYPE: string
//OUTPUT: meme for given id, if found in datastore
Moralis.Cloud.define("fetchById", async (request) => {
  const query = new Moralis.Query("Memes");
  const pipeline = [{ match: { objectId: request.params.memeId } }];

  return await query.aggregate(pipeline);
});

//NAME: fetchAllMemes
//INPUT: --------------------
//OUTPUT: all memes from datastore
Moralis.Cloud.define("fetchAllMemes", async (request) => {
  const query = new Moralis.Query("Memes");
  const pipeline = [];

  return await query.aggregate(pipeline);
});

//NAME: fetchLimitSortVotes
//INPUT: Limit, type: int. | Sort, type: int, 1 = ascending || -1 = descending, NOT MANDATORY
//OUTPUT: If given, returns max limit amount of memes, sorted ascending or descending by number of votes
Moralis.Cloud.define("fetchLimitSortVotes", async (request) => {
  if (request.params.sort && request.params.limit !== "") {
    const query = new Moralis.Query("Memes");
    const pipeline = [
      { sort: { votes: request.params.sort } },
      { limit: request.params.limit },
    ];
    return await query.aggregate(pipeline);
  } else {
    const query = new Moralis.Query("Memes");
    const pipeline = [];
    return await query.aggregate(pipeline);
  }
});

//NAME: fetchCreatedAtDesc
//INPUT: --------------------------------
//OUTPUT: All Memes from datatstore sorted descending by creation Date
Moralis.Cloud.define("fetchCreatedAtDesc", async (request) => {
  const query = new Moralis.Query("Memes");
  const pipeline = [{ sort: { createdAt: -1 } }];

  return await query.aggregate(pipeline);
});

//NAME: handleUpload
//INPUT: Image, type: JPG/PNG/BMP, size: ?, format: ?. Description, type: string
//OUTPUT: Metadata (memeName, description, ipfsImageURI)
const handleUpload = async () => {
  setIsUploading(true);
  //Saves image file to ipfs
  const MoralisFile = new Moralis.File(file.name, file);
  await MoralisFile.saveIPFS();
  //Returns URI and Hash of Image
  const ipfsImage = await MoralisFile.ipfs();
  const hashImage = await MoralisFile.hash();
  //Sets initial votecount for new meme
  var votes = 0;

  //creating metada of NFT on ipfs, to paste url to ERC1155 object on blockhain
  const metadata = {
    memeName: memeName, //Changed to memeName because name is a reserved keyword and not possible to use anymore
    description: description,
    image: ipfsImage,
  };
  const MetadataFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await MetadataFile.saveIPFS();
  const ipfsMetada = await MetadataFile.ipfs();
  const hashMetadata = await MetadataFile.hash;
  console.log(ipfsMetada);

  console.log("Meme created. Fetching data...");
  if (ipfsImage && hashImage) {
    const newMeme = new Moralis.Object("Memes");
    newMeme.set("ipfs", ipfsImage);
    newMeme.set("hash", hashImage);
    newMeme.set("file", MoralisFile);
    newMeme.set("owner", user);
    newMeme.set("address", window.ethereum.selectedAddress);
    newMeme.set("name", name);
    newMeme.set("description", description);
    newMeme.set("votes:", votes);
    newMeme.set("voters", []);
    newMeme.set("metadata", ipfsMetada);
    await newMeme.save();

    //Clean up
    nameInputRef.current.value = "";
    setName("");
    descriptionInputRef.current.value = "";
    setDescription("");
    fileInputRef.current.value = "";
    setFile(null);

    await fetchUsersMemes();
    setIsUploading(false);
    alert("Your meme got created! You can see it in Your Memes - Section");
    const query = new Moralis.Query("Memes");
    query.equalTo("owner", user);
    query.find().then(([meme]) => {
      console.log("Meme Item from Moralis", meme);
      console.log("Meme Name", meme.attributes.name);
      console.log("ETHAddress of MemeOwner", window.ethereum.selectedAddress);
      console.log("userName of MemeOwner", meme.attributes.owner);
      console.log("IPFS of Meme", meme.attributes.ipfs);
      console.log("IPFSHash of Meme", meme.attributes.hash);
      console.log("Description of Meme", meme.attributes.description);
      console.log("Votecount of Meme", meme.attributes.votes);
      console.log("Voters:", meme.attributes.voters);
    });
  }
  setIsUploading(false);
};

//Name: fetchCurrentUser
//INPUT: --------------------
//OUTPUT: returns all data related to the current user: id, e-mail, accounts, username, ...
const user = await Moralis.User.current();
console.log(user);

//NAME: FetchMyVotes
//INPUT: -------------------- Requirement: user has to be logged in
//OUTPUT: All memes voted on by the current user
Moralis.Cloud.define("fetchMyVotes", async (request) => {
  const query = new Moralis.Query("Memes");
  const pipeline = [{ match: { voters: request.user.id } }];

  return await query.aggregate(pipeline);
});

//NAME: handleUpload (addMeme)
//INPUT: file, type: any image file should be supported (?), name
//OUTPUT: logs url of JSON Metadata and image hash from ipfs

const handleUpload = async () => {
  setIsUploading(true);
  const MoralisFile = new Moralis.File(file.name, file);
  await MoralisFile.saveIPFS();
  const ipfsImage = await MoralisFile.ipfs();
  const hashImage = await MoralisFile.hash();
  var votes = 0;

  //creating metada of NFT on ipfs, to paste url to ERC1155 object on blockhain
  const metadata = {
    memeName: memeName, //name is a reserved keyword and can not be used, changed to memeName
    description: description,
    image: ipfsImage,
  };
  const MetadataFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await MetadataFile.saveIPFS();
  const ipfsMetada = await MetadataFile.ipfs();
  const hashMetadata = await MetadataFile.hash;
  console.log(ipfsMetada);

  console.log("Meme created. Fetching data...");
  if (ipfsImage && hashImage) {
    const newMeme = new Moralis.Object("Memes");
    newMeme.set("ipfs", ipfsImage);
    newMeme.set("hash", hashImage);
    newMeme.set("file", MoralisFile);
    newMeme.set("owner", user);
    newMeme.set("address", window.ethereum.selectedAddress);
    newMeme.set("name", name);
    newMeme.set("description", description);
    newMeme.set("votes:", votes);
    newMeme.set("voters", []);
    newMeme.set("metadata", ipfsMetada);
    await newMeme.save();

    //Clean up
    nameInputRef.current.value = "";
    setName("");
    descriptionInputRef.current.value = "";
    setDescription("");
    fileInputRef.current.value = "";
    setFile(null);

    await fetchUsersMemes();
    setIsUploading(false);
    alert("Your meme got created! You can see it in Your Memes - Section");
    const query = new Moralis.Query("Memes");
    query.equalTo("owner", user);
    query.find().then(([meme]) => {
      console.log("Meme Item from Moralis", meme);
      console.log("Meme Name", meme.attributes.name);
      console.log("ETHAddress of MemeOwner", window.ethereum.selectedAddress);
      console.log("userName of MemeOwner", meme.attributes.owner);
      console.log("IPFS of Meme", meme.attributes.ipfs);
      console.log("IPFSHash of Meme", meme.attributes.hash);
      console.log("Description of Meme", meme.attributes.description);
      console.log("Votecount of Meme", meme.attributes.votes);
      console.log("Voters:", meme.attributes.voters);
    });
  }
  setIsUploading(false);
};

//NAME: fetchMemeOfTheDay
//INPUT: --------------------
//OUTPUT: ranking of all memes voted on in past 24hours.
const fetchMemeOfTheDay = async () => {
  let memes = await Moralis.Cloud.run("fetchAllMemes");
  console.log(memes);
  let oneDay = 24 * 60 * 60 * 1000;
  console.log(oneDay);
  let posts = [];
  const filteredMemes = memes.filter((meme) => {
    return meme.voters.find((currentTimestamp) =>
      currentTimestamp.timestamp >= Date.now() - oneDay ? posts.push(meme) : ""
    );
  });
  console.log("FM", filteredMemes);
  const highestVotes = filteredMemes.sort((a, b) => {
    return b.voters.length - a.voters.length;
  });
  setRanking();
  setRanking(highestVotes);
};

//NAME: fetchMemeOfTheDay
//INPUT: --------------------
//OUTPUT: returns Memes sort by votecount of past 24hours. highestVotes[0] holds current Meme Of The Day.
//NOTE: this needs to be inside of the MemeOfTheDay.js Component as it sets state from inside there!
const fetchMemeOfTheDay = async () => {
  let memes = await Moralis.Cloud.run("fetchAllMemes");
  // console.log(memes);

  //Filters out all memes by vote count of last 24hours!
  let oneDay = 24 * 60 * 60 * 1000;
  let posts = [];
  const filteredMemes = memes.filter((meme) => {
    return meme.voters.find((currentTimestamp) =>
      currentTimestamp.timestamp >= Date.now() - oneDay ? posts.push(meme) : ""
    );
  });
  // console.log("FM", filteredMemes);
  const highestVotes = filteredMemes.sort((a, b) => {
    return b.voters.length - a.voters.length;
  });
  //empty State
  setRanking();
  //set state with new data
  setRanking(highestVotes);
};
