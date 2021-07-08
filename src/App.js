import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Button,
  Box,
  Input,
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
import ShowMemesLandingPageLoggedIn from "./components/ShowMemesLandingPageLoggedIn";
import ConnectWallet from "./components/ConnectWallet";
import MemeOfTheDay from "./components/MemeOfTheDay";
import Search from "./components/Search";
import Moralis from "moralis/lib/browser/Parse";

import { ABI_MOTD_V1 } from "./abis/ABI_MOTDV1";

function App() {
  const { isAuthenticated, authError, isInitialized } = useMoralis();
  const [user, setUser] = useState();
  const [hasWeb3, setHasWeb3] = useState();
  const [results, setResults] = useState([]);
  const [allMemes, setAllMemes] = useState([]);
  const [fetchId, setFetchId] = useState("");
  const [limit, setLimit] = useState("");
  const [sort, setSort] = useState("");
  const [motdContract, setMotdContract] = useState();
  const motdContractAddress = "0xf8686dd0Fef2108D50bA340C6a48b830Eee67c59";
  const [totalMinted, setTotalMinted] = useState();

  useEffect(async () => {
    if (window.ethereum) {
      setHasWeb3(true);
      const web3 = await Moralis.Web3.enable();
      const motdInstance = new web3.eth.Contract(
        ABI_MOTD_V1,
        motdContractAddress
      );
      console.log(motdInstance);
      setMotdContract(motdInstance);
      fetchContractData();
    }
    if (!window.ethereum) {
      setHasWeb3(false);
    }
  }, []);

  const fetchContractData = async () => {
    let result = await Moralis.Cloud.run("fetchAllMemes");
    let memeCount = result.length;
    setTotalMinted(memeCount);
   
  };

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

          <Tabs isLazy defaultIndex={0}>
            <TabList>
              <Tab>Meme Of The Day</Tab>
              <Tab>Memes Stream</Tab>
              <Tab>My Memes</Tab>
              <Tab>Search</Tab>
              <Tab>Create new Meme</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {isInitialized ? (
                  <MemeOfTheDay isInitialized={isInitialized} />
                ) : (
                  "Loading Memes"
                )}
              </TabPanel>
              <TabPanel>
                {" "}
                {allMemes !== undefined ? (
                  <ShowMemesLandingPageLoggedIn
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
              <TabPanel><Search /></TabPanel>
              <TabPanel>
                {user !== undefined ? (
                  <UploadComponent
                    user={user}
                    fetchUsersMemes={fetchUsersMemes}
                    motdContract={motdContract}
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
        <Box align="center">
          <Heading mb={6}>
            <Image
              src="https://dashboard-assets.dappradar.com/document/5158/memeoftheday-dapp-collectibles-matic-logo-166x166_e565ca917e493c8e5c6196776a56384c.png"
              alt="LogoMOTD"
              borderRadius="0px 0px 18px 18px"
            />
            <Text fontSize="md">on Mumbai Testnet</Text>
          </Heading>
          {totalMinted !== undefined && (
            <Text>Total Memes Minted: {totalMinted}</Text>
          )}
        </Box>

        {authError && <AuthError />}

        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Meme Of The Day</Tab>
            <Tab>Meme Stream</Tab>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
            <Tab>Search</Tab>
            <Tab>Queries</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {isInitialized ? <MemeOfTheDay /> : "Loading... "}
            </TabPanel>
            <TabPanel>
              <Text color="red">Login or SignUp to use all features</Text>
              {isInitialized === true ? (
                <ShowMemesLandingPage
                  fetchAllMemes={fetchAllMemes}
                  allMemes={allMemes}
                />
              ) : (
                "Loading..."
              )}
            </TabPanel>
            <TabPanel>
              <Stack spacing={8}>
                <LogIn />
                <ResetPassword />
              </Stack>
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel><Search /></TabPanel>
            <TabPanel>
              {/* QUERIES */}
              {/* FETCH MEME BY ID */}
              <Box>
                <Input
                  placeholder="insert id"
                  onChange={(e) => setFetchId(e.target.value)}
                  value={fetchId}
                  mt={2}
                />
                <Button
                  colorScheme="teal"
                  onClick={async () => {
                    if (fetchId === undefined || fetchId === "") {
                      alert("Please insert an id!");
                      return;
                    }
                    let result = await Moralis.Cloud.run("fetchById", {
                      memeId: fetchId,
                    });
                    if (result === undefined || result.length <= 0) {
                      alert("No meme found for this id");
                      setFetchId("");
                    }
                    if (result !== undefined && result.length > 0) {
                      console.log(result[0]);
                      alert(
                        "Found meme with Id " +
                          fetchId +
                          " and name " +
                          result[0].name
                      );
                      setFetchId("");
                    }
                  }}
                  mt={2}
                >
                  Fetch by Id
                </Button>
              </Box>
              {/* FETCH ALL MEMES */}
              <Box mt={2}>
                <Button
                  onClick={async () => {
                    let result = await Moralis.Cloud.run("fetchAllMemes");
                    if (result !== undefined && result.length > 0) {
                      alert("Found " + result.length + " Memes");
                      console.log(result);
                    }
                    if (result === undefined || result.length === 0) {
                      alert("No Memes found");
                    }
                  }}
                >
                  FetchAllMemes
                </Button>
              </Box>
              {/* FETCH LIMIT SORT VOTES */}
              <Box>
                <Input
                  placeholder="insert limit"
                  onChange={(e) => setLimit(e.target.value)}
                  value={limit}
                  mt={2}
                />
                <Input
                  placeholder="1 for asc, -1 for desc"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                  mt={2}
                />
                <Button
                  colorScheme="teal"
                  onClick={async () => {
                    if (sort === "" && limit !== "") {
                      try {
                        let result = await Moralis.Cloud.run(
                          "fetchLimitSortVotes",
                          {
                            sort: -1,
                            limit: parseInt(limit),
                          }
                        );
                        if (result === undefined || result.length <= 0) {
                          alert("No memes found");
                          setSort("");
                          setLimit("");
                        }
                        if (result !== undefined && result.length > 0) {
                          console.log("FetchLimitSortVotesResult: ", result);
                          alert("Found meme(s) " + result.length);
                          setSort("");
                          setLimit("");
                        }
                      } catch (error) {
                        console.error(error);
                        setSort("");
                        setLimit("");
                      }
                    } else if (limit === "" && sort === "") {
                      try {
                        let result = await Moralis.Cloud.run(
                          "fetchLimitSortVotes",
                          {
                            sort: -1,
                            limit: 9999999999999999999999999,
                          }
                        );
                        if (result === undefined || result.length <= 0) {
                          alert("No memes found");
                          setSort("");
                          setLimit("");
                        }
                        if (result !== undefined && result.length > 0) {
                          console.log("FetchLimitSortVotesResult: ", result);
                          alert("Found meme(s) " + result.length);
                          setSort("");
                          setLimit("");
                        }
                      } catch (error) {
                        console.error(error);
                        setSort("");
                        setLimit("");
                      }
                    } else {
                      try {
                        let result = await Moralis.Cloud.run(
                          "fetchLimitSortVotes",
                          {
                            sort: parseInt(sort),
                            limit: parseInt(limit),
                          }
                        );
                        if (result === undefined || result.length <= 0) {
                          alert("No memes found");
                          setSort("");
                          setLimit("");
                        }
                        if (result !== undefined && result.length > 0) {
                          console.log("FetchLimitSortVotesResult: ", result);
                          alert(
                            "Found meme(s) " + result.length + " and sorted!"
                          );
                          setSort("");
                          setLimit("");
                        }
                      } catch (error) {
                        console.error(error);
                        setSort("");
                        setLimit("");
                      }
                    }
                  }}
                  mt={2}
                >
                  Fetch with limit and sort
                </Button>
              </Box>
              {/* FETCH CREATEDAT DESC */}
              <Box>
                <Button
                  onClick={async () => {
                    let result = await Moralis.Cloud.run("fetchCreatedAtDesc");
                    if (result !== undefined && result.length > 0) {
                      alert(
                        "Fetched all memes sorted by createdAt desc. See console for results!"
                      );
                      console.log("fetchCreatedAtDesc Results: ", result);
                    }
                  }}
                  mt={2}
                >
                  Fetch Created At Desc
                </Button>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
