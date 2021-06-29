import React, { useEffect } from "react";
import { Box, Image, Text, Heading, Stack, Button } from "@chakra-ui/react";
import { Moralis } from "moralis";

function ShowMemesLandingPageLoggedIn({ allMemes, fetchAllMemes }) {
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
      <Text>
        <strong>Metadata: </strong> {meme.attributes.metadata}
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
            await toUpdate.add("voters", currentUser.id);
            await toUpdate.save();
            await toUpdate.increment("votes");
            await toUpdate.save();
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
            await toUpdate.decrement("votes");
            await toUpdate.save();
            const voters = toUpdate.attributes.voters;
            const voterIndex = voters.indexOf(currentUser.id);
            console.log(voterIndex);
            if (voterIndex > -1) {
              voters.splice(voterIndex, 1);
            }
            console.log(voters);
            await toUpdate.set("voters", voters);
            await toUpdate.save();
          }}
        >
          Unvote
        </Button>
      )}
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

export default ShowMemesLandingPageLoggedIn;
