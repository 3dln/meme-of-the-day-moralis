import React, { useEffect } from "react";
import { Box, Image, Text, Heading, Stack, Button } from "@chakra-ui/react";
import { Moralis } from "moralis";

function ShowMemesLandingPage({ allMemes, fetchAllMemes }) {
  // const currentUser = Moralis.User.current();
  const memes = allMemes.map((meme, i) => (
    <Box
      mb={4}
      pb={4}
      align="center"
      bg="#2a9d8f"
      style={{ borderRadius: "15px" }}
    >
      <Box
        width="90%"
        p={2}
        m={2}
        bg="#1d3557"
        style={{ borderRadius: "15px" }}
      >
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
      </Box>

      <Image
        p={1}
        style={{ borderRadius: "15px" }}
        boxSize="400px"
        src={meme.attributes.ipfs}
        alt={meme.attributes.name}
      />
      {meme.attributes.comments !== undefined &&
        meme.attributes.comments.length > 0 && (
          <Box
            align="center"
            width="100%"
            bg="blue"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <Text>
              <strong>Comments: </strong>
              {meme.attributes.comments.map(
                (a) => a.user + ": " + a.comment + "\r"
              )}
            </Text>
          </Box>
        )}
      <Box
        align="center"
        width="30%"
        bg="blue"
        style={{ borderRadius: "15px" }}
      >
        <Text fontSize="2xl">
          <strong>Votes total: </strong>
          {meme.attributes.votes}
        </Text>
      </Box>
      {meme.attributes.isOnSale === true && (
        <Box
          bg="green"
          style={{ borderRadius: "15px" }}
          width="max-content"
          p={1}
        >
          <Text>On Sale!</Text>
          <Text>Price: {meme.attributes.price} MATIC</Text>
          <Text>Log In to buy this meme!</Text>
        </Box>
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
      <Box
        bg="#264653"
        mb={4}
        p={1}
        style={{ borderRadius: "15px" }}
        align="center"
      >
        <Heading>All Memes</Heading>
      </Box>
      <Box>
        <Stack spacing={7}>{memes}</Stack>
      </Box>
    </>
  );
}

export default ShowMemesLandingPage;
