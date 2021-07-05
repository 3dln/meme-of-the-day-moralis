import React, { useState } from "react";
import { Moralis } from "moralis";
import { Box, Button, Input, Textarea, BeatLoader } from "@chakra-ui/react";

function UploadComponent({ user, fetchUsersMemes }) {
  const [memeName, setMemeName] = useState();
  const nameInputRef = React.useRef();
  const [file, setFile] = useState();
  const fileInputRef = React.useRef();
  const [description, setDescription] = useState();
  const descriptionInputRef = React.useRef();
  const [isUploading, setIsUploading] = useState(false);

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
      newMeme.set("memeName", memeName);
      newMeme.set("description", description);
      newMeme.set("votes:", votes);
      newMeme.set("voters", []);
      newMeme.set("metadata", ipfsMetada);
      await newMeme.save();

      //Clean up
      nameInputRef.current.value = "";
      setMemeName("");
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

  return (
    <Box>
      <Input
        placeholder="Name"
        value={memeName}
        onChange={(e) => setMemeName(e.target.value)}
        ref={nameInputRef}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ref={descriptionInputRef}
      />
      <Input
        type={"file"}
        placeholder="Name"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        ref={fileInputRef}
      ></Input>

      <Button onClick={handleUpload}>Create Meme</Button>

      {/* {isUploading === true && (
        <Button
          isLoading
          loadingText="...creating Meme"
          colorScheme="blue"
          spinner={<BeatLoader size={8} color="white" />}
        ></Button>
      )} */}
    </Box>
  );
}

export default UploadComponent;
