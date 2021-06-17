import React from "react";
import { useMoralis } from "react-moralis";
import { Button } from "@chakra-ui/react";

function LogOut() {
  const { logout } = useMoralis();
  return <Button onClick={() => logout()}>Logout</Button>;
}

export default LogOut;
