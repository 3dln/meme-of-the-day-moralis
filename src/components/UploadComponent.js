import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Box, Button, Input } from "@chakra-ui/react";

function UploadComponent() {
  return (
    <Box>
      <Input placeholder="Name"></Input>
      <Button>Create Meme</Button>
    </Box>
  );
}

export default UploadComponent;
