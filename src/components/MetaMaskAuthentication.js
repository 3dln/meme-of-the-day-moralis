import React from "react";
import { useMoralis } from "react-moralis";
import { Button } from "@chakra-ui/react";
function MetaMaskAuthentication() {
  const { authenticate, isAuthenticating } = useMoralis();
  return (
    <div>
      <Button isLoading={isAuthenticating} onClick={() => authenticate()}>
        Authenticate with MetaMask
      </Button>
    </div>
  );
}

export default MetaMaskAuthentication;
