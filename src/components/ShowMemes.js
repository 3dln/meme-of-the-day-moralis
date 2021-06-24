import React, { useEffect, updateState } from "react";
import { Box, Image, Text, Heading, Stack, Button } from "@chakra-ui/react";
import { Moralis } from "moralis";

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
        {meme.attributes.votes}
      </Text>
      <Button
        onClick={async () => {
          const Memes = Moralis.Object.extend("Memes");
          const query = new Moralis.Query(Memes);
          const toDelete = await query.get(meme.id);
          await toDelete.destroy();
          window.location.reload();
        }}
      >
        Delete Meme
      </Button>
    </Box>
  ));

  useEffect(() => {
    fetchUsersMemes();
  }, []);

  return (
    <>
      <Heading>Your Memes:</Heading>
      <Stack spacing={7}>{memes}</Stack>
    </>
  );
}

export default ShowMemes;
