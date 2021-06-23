import React, { useState } from "react";
import { Button, Stack, Input } from "@chakra-ui/react";
import { Moralis } from "moralis";
const ResetPassword = () => {
  const [email, setEmail] = useState();

  return (
    <Stack spacing={3}>
      <Input
        isRequired
        placeholder="E-Mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button
        onClick={() => {
          Moralis.User.requestPasswordReset(email)
            .then(() => {
              alert("Password request successfull, please check your Email!");
            })
            .catch((error) => {
              alert("Error:" + error.code + " " + error.message);
            });
        }}
      >
        Request Password Reset
      </Button>
    </Stack>
  );
};

export default ResetPassword;
