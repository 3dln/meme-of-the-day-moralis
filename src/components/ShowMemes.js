import React, { useState, useEffect } from "react";
import { Moralis } from "moralis";
import { Box, Image, Text, Button } from "@chakra-ui/react";

function ShowMemes({ user }) {
  const [url, setUrl] = useState();
  const [description, setDescription] = useState();
  const [owner, setOwner] = useState();
  const [ethAddress, setEthAddress] = useState();
  const [hash, setHash] = useState();
  const [votecount, setVotecount] = useState();
  const [memeName, setMemeName] = useState();

  useEffect(() => {
    fetchUsersMemes();
  }, []);

  //fetches Memes of Current User
  const fetchUsersMemes = async () => {
    const query = new Moralis.Query("Memes");
    query.equalTo("owner", user);
    query.find().then(([meme]) => {
      if (meme) {
        console.log("Meme Item from Moralis", meme);
        console.log("Meme Name", meme.attributes.name);
        setMemeName(meme.attributes.name);
        console.log("ETHAddress of MemeOwner", meme.attributes.address);
        setEthAddress(meme.attributes.address);
        console.log("userName of MemeOwner", meme.attributes.owner);
        setOwner(meme.attributes.owner.id);
        console.log("IPFS of Meme", meme.attributes.ipfs);
        setUrl(meme.attributes.ipfs);
        console.log("IPFSHash of Meme", meme.attributes.hash);
        setHash(meme.attributes.hash);
        console.log("Votecount of Meme", meme.attributes.votes);
        setVotecount(meme.attributes.votes);
        console.log("Description of Meme", meme.attributes.description);
        setDescription(meme.attributes.description);
      }
    });
  };

  return (
    <Box>
      <Text>
        <strong>Title:</strong> {memeName && memeName}
      </Text>
      <Text>
        <strong>Description:</strong> {description && description}
      </Text>
      <Text>
        <strong>Meme Owner:</strong> {owner && owner}
      </Text>
      <Text>
        <strong>ETH Address:</strong> {ethAddress}
      </Text>
      <Text>
        <strong>Hash:</strong> {hash}
      </Text>
      <Image src={url && url} />
      <Text>
        <strong>Votes received: </strong>
        {votecount && votecount}
      </Text>
      <Button onClick={() => fetchUsersMemes()}>Refresh Memes</Button>
    </Box>
  );
}

export default ShowMemes;
