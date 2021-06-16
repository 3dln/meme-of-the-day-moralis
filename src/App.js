import React from "react";
import {
  Button,
  Container,
  Heading,
  AlertIcon,
  Alert,
  Box,
  AlertTitle,
  AlertDescription,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MetaMaskAuthentication from "./components/MetaMaskAuthentication";

function App() {
  const { isAuthenticated, authError, logout } = useMoralis();
  if (isAuthenticated) {
    return (
      <Container>
        <Heading>Welcome to Meme of the Day</Heading>
        <Button onClick={() => logout()}>Logout</Button>
      </Container>
    );
  }
  return (
    <div className="App">
      <Container>
        <Heading mb={6}>Meme of the Day Login</Heading>
        <Stack spacing={6}>
          {authError && (
            <Alert status="error">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Authentication has failed!</AlertTitle>
                <AlertDescription display="block">
                  {authError.message}
                </AlertDescription>
              </Box>
            </Alert>
          )}
          <MetaMaskAuthentication />
          <Text textAlign="center">
            <em>or</em>
          </Text>
          <SignUp />
          <Text textAlign="center">
            <em>or</em>
          </Text>
          <LogIn />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
