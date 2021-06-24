import React, { useEffect } from "react";
import { Box, Image, Text, Heading } from "@chakra-ui/react";

function ShowMemesLandingPage({ allMemes, fetchAllMemes }) {
  const memes = allMemes.map((meme, i) => (
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
        {meme.attributes.owner.attributes.username !== undefined
          ? `${meme.attributes.owner.attributes.username}`
          : " Not available"}
      </Text>
      <Text>
        <strong>ETH ADDRESS:</strong>
        {meme.attributes.owner.attributes.ethAddress !== undefined
          ? `${meme.attributes.owner.attributes.ethAddress}
        `
          : " Not available"}
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
    fetchAllMemes();
  }, []);

  return (
    <>
      <Heading>Memes from other users</Heading>
      {memes}

      {/* <Button onClick={fetchUsersMemes}>Fetch Again</Button> */}
    </>
  );
}

export default ShowMemesLandingPage;
