import React, { useState } from "react";
import { Moralis } from "moralis";
import {
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  CloseButton,
  Box,
} from "@chakra-ui/react";

function ConnectWallet({ setCurrentUser, user }) {
  const [accountChanged, setAccountChanged] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [authIsUsed, setAuthIsUsed] = useState(false);

  //Checks if account is already linked to currentUser
  const checkIfLinked = async () => {
    const currentUser = Moralis.User.current();
    const accounts = await currentUser.attributes.accounts;
    let accountLinked;
    if (accounts !== undefined) {
      return (accountLinked = accounts.includes(
        window.ethereum.selectedAddress
      ));
    } else {
      accountLinked = false;
      return accountLinked;
    }
  };

  //Connects User Wallet
  const connectUserWallet = async () => {
    var isLinked = await checkIfLinked();
    //  console.log("IL", isLinked);
    if (Moralis.Web3) {
      try {
        if (isLinked === true) {
          // console.log(isLinked);
          await Moralis.Web3.enable();
          setCurrentUser();
          setAccountChanged(false);
          setIsConnected(true);
        }
        if (isLinked === false) {
          if (
            window.confirm(
              "Would you like to link this account to your user profile?"
            )
          ) {
            await Moralis.Web3.enable();
            await Moralis.Web3.link(window.ethereum.selectedAddress);
            setAccountChanged(false);
            setIsConnected(true);
          }
        }
      } catch (error) {
        setAuthIsUsed(true);
      }
    }
  };

  //Listens for account Changes and asks if user want to link address if not already linked
  Moralis.Web3.on("accountsChanged", async (accounts) => {
    console.log("Metamask account changed!");
    setAccountChanged(true);
    setIsConnected(false);
  });

  return (
    <Box align="center">
      {isConnected === false && (
        <Box p={1} align="center" width="40%" bg="#757b90" style={{borderRadius: "15px"}}>
        <Button onClick={connectUserWallet}>Connect your Wallet</Button>
        </Box>
      )}
      {isConnected === true && (
        <Box>
          <Button isDisabled>
            Connected: {window.ethereum.selectedAddress}
          </Button>
          <Button onClick={() => setIsConnected(false)}>Disconnect</Button>
        </Box>
      )}
      {/* {isConnected === true && (
        <Button onClick={setIsConnected(false)}>Disconnect</Button>
      )} */}
      {accountChanged && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Your ETH Address changed.</AlertTitle>
          <AlertDescription>Please connect your wallet again!</AlertDescription>
          <CloseButton
            onClick={() => setAccountChanged(false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
      {authIsUsed === true && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>This Auth is already in use!</AlertTitle>
          <AlertDescription>
            This account is already linked to another user account! Please
            connect with another address. For further questions, please reach
            out to Meme Of The Day Support!
          </AlertDescription>
          <CloseButton
            onClick={() => {
              setAccountChanged(false);
              setAuthIsUsed(false);
            }}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
    </Box>
  );
}

export default ConnectWallet;
