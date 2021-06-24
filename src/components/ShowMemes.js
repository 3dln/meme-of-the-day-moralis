import React, { useEffect } from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";

function ShowMemes({ results, fetchUsersMemes }) {
  const memes = results.map((meme, i) => (
    <Box>
      <Text key={`Title` + meme.id}>
        <strong>Title: </strong>
        {meme.attributes.name}
      </Text>
      <Text key={`Description` + meme.id}>
        <strong>Description: </strong>
        {meme.attributes.description}
      </Text>
      <Text key={`Owner` + meme.id}>
        <strong>Meme Owner: </strong>{" "}
        {meme.attributes.owner.attributes.username}
      </Text>
      <Text>
        <strong>ETH Address: </strong>
        {meme.attributes.owner.attributes.ethAddress}
      </Text>
      <Text>
        <strong>Hash: </strong> {meme.attributes.hash}
      </Text>
      <Image
        boxSize="350px"
        src={meme.attributes.ipfs}
        alt={meme.attributes.name}
      />
      <Text>
        <strong>Votes: </strong>
        {}
      </Text>
    </Box>
  ));

  useEffect(() => {
    fetchUsersMemes();
  }, []);

  return (
    <>
      {memes}

      <Button onClick={fetchUsersMemes}>Fetch Again</Button>
    </>
  );
}

export default ShowMemes;
