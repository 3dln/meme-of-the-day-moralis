import React, { useEffect } from "react";
import { Box, Image, Text, Heading, Stack, Button } from "@chakra-ui/react";
import { Moralis } from "moralis";

function ShowMemesLandingPage({ allMemes, fetchAllMemes, user }) {
  const currentUser = Moralis.User.current();
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
        {meme.attributes.votes}
      </Text>
      {!meme.attributes.voters.includes(currentUser.id) ? (
        <Button
          onClick={async () => {
            const Memes = Moralis.Object.extend("Memes");
            const query = new Moralis.Query(Memes);
            const toUpdate = await query.get(meme.id);
            toUpdate.add("voters", currentUser.id);
            toUpdate.save();
            toUpdate.increment("votes");
            toUpdate.save();
            window.location.reload();
          }}
        >
          Vote
        </Button>
      ) : (
        <Button
          onClick={async () => {
            const Memes = Moralis.Object.extend("Memes");
            const query = new Moralis.Query(Memes);
            const toUpdate = await query.get(meme.id);
            toUpdate.decrement("votes");
            toUpdate.save();
            const voters = toUpdate.attributes.voters;
            const voterIndex = voters.indexOf(currentUser.id);
            console.log(voterIndex);
            if (voterIndex > -1) {
              voters.splice(voterIndex, 1);
            }
            console.log(voters);
            toUpdate.set("voters", voters);
            toUpdate.save();
            window.location.reload();
          }}
        >
          Unvote
        </Button>
      )}
    </Box>
  ));

  useEffect(() => {
    fetchAllMemes();
  }, []);

  return (
    <>
      <Heading>Memes from other users</Heading>
      <Stack spacing={7}>{memes}</Stack>
    </>
  );
}

export default ShowMemesLandingPage;
