import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import AuthError from "./components/AuthError";
import ResetPassword from "./components/ResetPassword";
import UploadComponent from "./components/UploadComponent";
import GreetUser from "./components/GreetUser";
import ShowMemes from "./components/ShowMemes";
import ConnectWallet from "./components/ConnectWallet";
import Moralis from "moralis/lib/browser/Parse";

function App() {
  const { isAuthenticated, authError } = useMoralis();
  const [user, setUser] = useState();
  const [hasWeb3, setHasWeb3] = useState();

  useEffect(() => {
    if (window.ethereum) {
      setHasWeb3(true);
    }
    if (!window.ethereum) {
      setHasWeb3(false);
    }
  }, []);

  //Fetches and sets current User from Moralis session
  const setCurrentUser = async () => {
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
          {hasWeb3 === true ? (
            <ConnectWallet setCurrentUser={setCurrentUser} user={user} />
          ) : (
            <Button onClick={() => window.open("https://metamask.io")}>
              Get MetaMask to use Meme of the Day to it's full extend!
            </Button>
          )}

          {user ? (
            <UploadComponent user={user} />
          ) : (
            "Please connect your wallet to create Memes"
          )}
          {user && <ShowMemes user={user} />}
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
