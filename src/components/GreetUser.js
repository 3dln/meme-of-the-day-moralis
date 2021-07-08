import React from "react";
import { Moralis } from "moralis";
import { Heading, Box } from "@chakra-ui/react";

function GreetUser() {
  const currentUser = Moralis.User.current();
  const currentUsername = currentUser.get("username");

  return (
    <Box p={4} bg="#1d3557" style={{borderRadius: "15px"}}>
    <Heading>
      Welcome to Meme of the Day {currentUser ? currentUsername : ""}
    </Heading>
    </Box>
  );
}

export default GreetUser;
