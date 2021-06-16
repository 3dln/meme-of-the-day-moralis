import React from "react";
import { useMoralis } from "react-moralis";
import { Button, Container, Heading } from "@chakra-ui/react";

function LogOut() {
  const { logout } = useMoralis();
  return (
    <div>
      <Container>
        <Heading>Welcome to Meme of the Day</Heading>
        <Button onClick={() => logout()}>Logout</Button>
      </Container>
    </div>
  );
}

export default LogOut;
