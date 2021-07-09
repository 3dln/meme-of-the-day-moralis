import React, { useEffect, updateState } from "react";
import { Box, Image, Text, Heading, Stack, Button, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Moralis } from "moralis";

function ShowMemes({ results, fetchUsersMemes }) {
  const currentUser = Moralis.User.current();
  const memes = results.map((meme, i) => (
    <Box mb={4} pb={4} align="center" bg="#2a9d8f" style={{borderRadius: "15px"}}>
      <Box width="90%" p={2} m={2} bg="#1d3557" style={{borderRadius: "15px"}}>
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
        {meme.attributes.owner.attributes.username}
      </Text>
      <Text>
        <strong>Hash: </strong> {meme.attributes.hash}
      </Text>
      <Text>
      <strong>Metadata: </strong> 
        <Link href={meme.attributes.metadata} isExternal>
        {meme.attributes.metadata} <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      </Box>
      <Image
       style={{borderRadius: "15px"}}
       boxSize="400px"
        src={meme.attributes.ipfs}
        alt={meme.attributes.name}
      />
      <Box align="center" width="100%" bg="blue" style={{borderRadius: "15px", padding: "30px"}}>
      {meme.attributes.comments ? ( 
        <Text>
          <strong>Comments: </strong>                      
            {meme.attributes.comments.map(a => a.user+": "+a.comment+"\r")}          
        </Text>
        ) : (null) } 
      </Box>
      <Box mt={1} align="center" width="30%" bg="blue" style={{borderRadius: "15px"}}>
      <Text>
        <strong>Votes: </strong>
        {meme.attributes.votes}
      </Text>
      </Box>
      <Button
      size="sm"
      mt={1}
      border="2px"
      borderColor="black"
        onClick={async () => {
          const Memes = Moralis.Object.extend("Memes");
          const query = new Moralis.Query(Memes);
          const toDelete = await query.get(meme.id);
          await toDelete.destroy();
        }}
      >
        Delete Meme
      </Button>
    </Box>
  ));

  useEffect(async () => {
    fetchUsersMemes();
    let query = new Moralis.Query("Memes");
    let subscription = await query.subscribe();
    subscription.on("create", fetchUsersMemes);
    subscription.on("update", fetchUsersMemes);
    subscription.on("delete", fetchUsersMemes);
  }, []);

  return (
    <>

    <Box m={1} bg= "#1d3557" style={{borderRadius: "15px"}} align="center" align="center">
      <Heading>Your Memes:</Heading>
      </Box>
      <Button
        onClick={async () => {
          let memes = await Moralis.Cloud.run("fetchAllMemes");
          console.log("ALLMEMES", memes);
          const filteredMemes = memes.filter((meme) => {
            return meme.voters.find(
              (currentVoter) => currentVoter.voter === currentUser.id
            );
          });
          console.log("FILTERS", filteredMemes);
        }}
      >
        FetchMyVotes
      </Button>
      <Stack spacing={7}>{memes}</Stack>
    </>
  );
}

export default ShowMemes;
