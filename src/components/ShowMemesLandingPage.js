import React, { useEffect } from "react";
import { Box, Image, Text, Heading, Stack, Button } from "@chakra-ui/react";
import { Moralis } from "moralis";

function ShowMemesLandingPage({ allMemes, fetchAllMemes }) {
  // const currentUser = Moralis.User.current();
  const memes = allMemes.map((meme, i) => (
    <Box>
      <Text key={`Title` + meme.id}>
        <strong>Title: </strong>
        {meme.attributes.memeName}
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
      <Text>
        <strong>Metadata: </strong> {meme.attributes.metadata}
      </Text>
      <Text>
        <strong>TokenID: </strong>{" "}
      </Text>
      <Image
        boxSize="350px"
        src={meme.attributes.ipfs}
        alt={meme.attributes.name}
      />
      <Text>
        <strong>Votes: </strong>
        {meme.attributes.votes}
      </Text>
    </Box>
  ));

  useEffect(async () => {
    fetchAllMemes();
    let query = new Moralis.Query("Memes");
    let subscription = await query.subscribe();
    subscription.on("create", fetchAllMemes);
    subscription.on("update", fetchAllMemes);
    subscription.on("delete", fetchAllMemes);
  }, []);

  return (
    <>
      <Heading>Memes from other users</Heading>
      <Stack spacing={7}>{memes}</Stack>
    </>
  );
}

export default ShowMemesLandingPage;
