import React, { useState } from "react";
import { Moralis } from "moralis";
import {
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

function ConnectWallet({ getCurrentUser }) {
  const [accountChanged, setAccountChanged] = useState(false);
  const [isConneced, setIsconced] = useState(false);

  //Checks if account is already linked to currentUser
  const checkIfLinked = async () => {
    const currentUser = Moralis.User.current();
    const accountLinked = currentUser.attributes.accounts.includes(
      window.ethereum.selectedAddress
    );
    return accountLinked;
  };

  //Connects User Wallet
  const connectUserWallet = async () => {
    const isLinked = await checkIfLinked();
    console.log(isLinked);
    if (Moralis.Web3) {
      if (isLinked === true) {
        console.log(isLinked);
        await Moralis.Web3.enable();
        setAccountChanged(false);
      }
      if (isLinked === false) {
        if (
          window.confirm(
            "Would you like to link this account to your user profile?"
          )
        ) {
          await Moralis.Web3.link(window.ethereum.selectedAddress);
          setAccountChanged(false);
        }
      }
    }
  };

  //Listens for account Changes and asks if user want to link address if not already linked
  Moralis.Web3.on("accountsChanged", async (accounts) => {
    console.log("renders");
    setAccountChanged(true);
  });

  return (
    <div>
      {isConnected === true && (
        <Button onClick={connectUserWallet}>Connect your Wallet</Button>
      )}

      <Button onClick={getCurrentUser}>Get Current User</Button>
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
    </div>
  );
}

export default ConnectWallet;
