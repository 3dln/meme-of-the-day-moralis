import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const appId = "5Sc4x5yeEpt880a7J22LguYMolPQatRW8fhyHKZW";
const serverUrl = "https://gqy0xtb7akau.moralis.io:2053/server";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
