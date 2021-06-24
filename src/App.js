import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import AuthError from "./components/AuthError";
import ResetPassword from "./components/ResetPassword";
import UploadComponent from "./components/UploadComponent";
import GreetUser from "./components/GreetUser";
import ShowMemes from "./components/ShowMemes";
import ShowMemesLandingPage from "./components/ShowMemesLandingPage";
import ConnectWallet from "./components/ConnectWallet";
import Moralis from "moralis/lib/browser/Parse";

function App() {
  const { isAuthenticated, authError } = useMoralis();
  const [user, setUser] = useState();
  const [hasWeb3, setHasWeb3] = useState();
  const [results, setResults] = useState([]);
  const [allMemes, setAllMemes] = useState([]);

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
      //console.log("CU", currentUser.attributes.accounts);
    }
    return currentUser;
  };

  //fetches Memes of Current User
  const fetchUsersMemes = async () => {
    const query = new Moralis.Query("Memes");
    query.equalTo("owner", Moralis.User.current());
    const results = await query.find();
    // alert("Retrieved " + results.length + " memes.");
    if (results !== undefined && results.length > 0) {
      setResults(results);
      //console.log(results);
    }
  };

  const fetchAllMemes = async () => {
    const query = new Moralis.Query("Memes");
    query.notEqualTo("owner", Moralis.User.current());
    const allMemes = await query.find();
    if (allMemes !== undefined) {
      setAllMemes(allMemes);
      //console.log(allMemes);
    }
  };

  if (isAuthenticated) {
    return (
      <Container>
        <Stack spacing={6}>
          <GreetUser />
          <LogOut />
          {hasWeb3 === true ? (
            <ConnectWallet setCurrentUser={setCurrentUser} user={user} />
          ) : (
            <Button onClick={() => window.open("https://metamask.io")}>
              Get MetaMask to use Meme of the Day to it's full extend!
            </Button>
          )}

          <Tabs isLazy defaultIndex={1}>
            <TabList>
              <Tab>Memes of others</Tab>
              <Tab>Your Memes</Tab>
              <Tab>Create new Meme</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {" "}
                {allMemes !== undefined ? (
                  <ShowMemesLandingPage
                    fetchAllMemes={fetchAllMemes}
                    allMemes={allMemes}
                  />
                ) : (
                  "Loading Memes..."
                )}
              </TabPanel>
              <TabPanel>
                {" "}
                {results !== undefined ? (
                  <ShowMemes
                    fetchUsersMemes={fetchUsersMemes}
                    results={results}
                  />
                ) : (
                  "Looks like you don't have any Memes yet!"
                )}
              </TabPanel>
              <TabPanel>
                {user !== undefined ? (
                  <UploadComponent
                    user={user}
                    fetchUsersMemes={fetchUsersMemes}
                  />
                ) : (
                  "Please connect your wallet to create Memes"
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    );
  }

  return (
    <div className="App">
      <Container>
        <Box>
          <Heading mb={6}>
            <Image
              src="https://dashboard-assets.dappradar.com/document/5158/memeoftheday-dapp-collectibles-matic-logo-166x166_e565ca917e493c8e5c6196776a56384c.png"
              alt="LogoMOTD"
            />
            <Text fontSize="md">on Mumbai Testnet</Text>
          </Heading>
        </Box>

        {authError && <AuthError />}
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack spacing={8}>
                <LogIn />
                <ResetPassword />
              </Stack>
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
