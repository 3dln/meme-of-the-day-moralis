import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import { createDomMotionComponent } from "framer-motion";

function UploadComponent({ user }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();

  const handleUpload = async () => {
    const MoralisFile = new Moralis.File(file.name, file);
    await MoralisFile.saveIPFS();
    const ipfs = await MoralisFile.ipfs();
    const hash = await MoralisFile.hash();
    //const name = await MoralisFile.name();
    console.log("Meme created. Fetching data...");

    if (ipfs && hash) {
      const newMeme = new Moralis.Object("Memes");
      newMeme.set("ipfs", ipfs);
      newMeme.set("hash", hash);
      newMeme.set("file", MoralisFile);
      newMeme.set("owner", user);
      newMeme.set("address", window.ethereum.selectedAddress);
      newMeme.set("name", name);
      newMeme.set("description", description);
      newMeme.set("votes:", "0");
      await newMeme.save();

      const query = new Moralis.Query("Memes");
      query.equalTo("owner", user);
      query.find().then(([meme]) => {
        console.log("Meme Item from Moralis", meme);
        console.log("Meme Name", meme.attributes.name);
        console.log("ETHAddress of MemeOwner", meme.attributes.address);
        console.log("userName of MemeOwner", meme.attributes.owner);
        console.log("IPFS of Meme", meme.attributes.ipfs);
        console.log("IPFSHash of Meme", meme.attributes.hash);
        console.log("Description of Meme", meme.attributes.description);
        console.log("Votecount of Meme", meme.attributes.votes);
      });
    }
  };

  return (
    <Box>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type={"file"}
        placeholder="Name"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      ></Input>
      <Button onClick={handleUpload}>Create Meme</Button>
    </Box>
  );
}

export default UploadComponent;
