import React, { useEffect, useState } from "react";
import { Box, Image, Text, Input, Heading, Stack, Button } from "@chakra-ui/react";
import { Moralis } from "moralis";

function renderComments(comments){
  //return comments.map((item, index) => <Text key={index}>{item.text}</Text>);
}

function ShowMemesLandingPageLoggedIn({ allMemes, fetchAllMemes }) {
  const [memeComment, setMemeComment] = useState();
  const commentInputRef = React.useRef();
  const currentUser = Moralis.User.current();
  const memes = allMemes.map((meme, i) => (
    <Box m={4} p={2} align="center" bg="#2a9d8f" style={{borderRadius: "15px"}}>
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
      </Box>
      <Image
          p={1}
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
      <Box align="center" width="30%" bg="blue" style={{borderRadius: "15px"}}>
        <Text>
          <strong>Votes: </strong>
          {meme.attributes.votes}
        </Text>
      </Box>
      {!meme.attributes.voters.find(
        (voter) => voter.voter === currentUser.id
      ) ? (
        <Button
        size="md"
        mt={1}
        border="2px"
        borderColor="white"
          onClick={async () => {
            const Memes = Moralis.Object.extend("Memes");
            const query = new Moralis.Query(Memes);
            const toUpdate = await query.get(meme.id);
            await toUpdate.add("voters", {
              voter: currentUser.id,
              timestamp: Date.now(),
            });
            await toUpdate.save();
            await toUpdate.increment("votes");
            await toUpdate.save();
          }}
        >
          Vote
        </Button>
      ) : (
        <Button
        size="md"
        mt={1}
        border="2px"
        borderColor="red"
          onClick={async () => {
            const Memes = Moralis.Object.extend("Memes");
            const query = new Moralis.Query(Memes);
            const toUpdate = await query.get(meme.id);
            await toUpdate.decrement("votes");
            await toUpdate.save();
            const voters = toUpdate.attributes.voters;
            const voterIndex = voters.findIndex(
              (voter) => voter.voter === currentUser.id
            );
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
      <Input
        placeholder="Comment"
        value={memeComment}
        onChange={(e) => setMemeComment(e.target.value)}
        ref={commentInputRef}
      />  
      <Button
        onClick={async () => {
          const Memes = Moralis.Object.extend("Memes");
          const query = new Moralis.Query(Memes);
          const toComment = await query.get(meme.id);
          await toComment.add("comments", {
            user: currentUser.id,
            comment: memeComment,
            timestamp: Date.now(),
          }); 
          await toComment.save();         

        }}
      >
          Comment
      </Button>

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

      <Box bg="#1d3557" style={{borderRadius: "15px"}} align="center">
      <Heading>Memes from other users</Heading>
      </Box>
      <Stack spacing={7}>{memes}</Stack>
    </>
  );
}

export default ShowMemesLandingPageLoggedIn;
