import React from "react";
import { Container, Heading, Stack, Text, Image } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import MetaMaskAuthentication from "./components/MetaMaskAuthentication";
import AuthError from "./components/AuthError";

function App() {
  const { isAuthenticated, authError } = useMoralis();

  if (isAuthenticated) {
    return <LogOut />;
  }

  return (
    <div className="App">
      <Container>
        <Heading mb={6}>
          <Image
            src="https://dashboard-assets.dappradar.com/document/5158/memeoftheday-dapp-collectibles-matic-logo-166x166_e565ca917e493c8e5c6196776a56384c.png"
            alt="LogoMOTD"
          />
        </Heading>
        <Stack spacing={6}>
          {authError && <AuthError />}
          <MetaMaskAuthentication />
          <Text textAlign="center">
            <em>or</em>
          </Text>
          <SignUp />
          <Text textAlign="center">
            <em>or</em>
          </Text>
          <LogIn />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
