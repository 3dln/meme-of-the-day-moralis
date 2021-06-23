import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Box, Button, Input, Textarea } from "@chakra-ui/react";

function UploadComponent({ user }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();

  const handleUpload = async () => {
    const MoralisFile = new Moralis.File(file.name, file);
    await MoralisFile.saveIPFS();
    const ipfs = await MoralisFile.ipfs();
    const hash = await MoralisFile.hash();
    const name = await MoralisFile.name();
    console.log(ipfs, hash);

    if (ipfs && hash) {
      const newMeme = new Moralis.Object("Memes");
      newMeme.set("ipfs", ipfs);
      newMeme.set("hash", hash);
      newMeme.set("file", MoralisFile);
      newMeme.set("owner", user);
      newMeme.set("address", window.ethereum.selectedAddress);
      newMeme.set("name", name);
      newMeme.set("description", description);
      await newMeme.save();
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
