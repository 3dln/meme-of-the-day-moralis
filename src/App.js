import React, { useState } from "react";
import { Container, Heading, Stack, Text, Image } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import AuthError from "./components/AuthError";
import ResetPassword from "./components/ResetPassword";
import MetaMaskAuthentication from "./components/MetaMaskAuthentication";
import GreetUser from "./components/GreetUser";
import ConnectWallet from "./components/ConnectWallet";
import Moralis from "moralis/lib/browser/Parse";

function App() {
  const { isAuthenticated, authError } = useMoralis();
  const [user, setUser] = useState();

  const getCurrentUser = async () => {
    const currentUser = Moralis.User.current();
    if (currentUser) {
      setUser(currentUser);
      console.log(currentUser.attributes.accounts);
    }
  };

  if (isAuthenticated) {
    return (
      <Container>
        <Stack spacing={6}>
          <GreetUser />
          <ConnectWallet getCurrentUser={getCurrentUser} user={user} />
          <LogOut />
        </Stack>
      </Container>
    );
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
          {/* <MetaMaskAuthentication />
          <Text textAlign="center">
            <em>or</em>
          </Text> */}
          <SignUp />
          <Text textAlign="center">
            <em>or</em>
          </Text>
          <LogIn />
          <ResetPassword />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
