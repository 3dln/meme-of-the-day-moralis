import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Box, Button, Input, InputGroup } from "@chakra-ui/react";

function UploadComponent({ user }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [uploadObject, setUploadObject] = useState();

  const handleUpload = async () => {
    const MoralisFile = new Moralis.File(file.name, file);
    await MoralisFile.saveIPFS();
    const ipfs = await MoralisFile.ipfs();
    const hash = await MoralisFile.hash();
    console.log(ipfs, hash);

    if (ipfs && hash) {
      const newMeme = new Moralis.Object("Memes");
      newMeme.set("ipfs", MoralisFile.ipfs());
      newMeme.set("hash", MoralisFile.hash());
      newMeme.set("file", MoralisFile);
      newMeme.set("owner", user);
      newMeme.set("address", window.ethereum.selectedAddress);
      await newMeme.save();
    }
  };

  return (
    <Box>
      <InputGroup>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          type={"file"}
          placeholder="Name"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        ></Input>
        <Button onClick={handleUpload}>Create Meme</Button>
      </InputGroup>
    </Box>
  );
}

export default UploadComponent;
