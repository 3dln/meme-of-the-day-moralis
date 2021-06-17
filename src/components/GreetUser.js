import React from "react";
import { Moralis } from "moralis";
import { Heading } from "@chakra-ui/react";

function GreetUser() {
  const currentUser = Moralis.User.current();
  const currentUsername = currentUser.get("username");
  if (currentUser) {
    console.log(currentUser.get("username"));
  }
  return (
    <Heading>
      Welcome to Meme of the Day {currentUser ? currentUsername : ""}
    </Heading>
  );
}

export default GreetUser;
