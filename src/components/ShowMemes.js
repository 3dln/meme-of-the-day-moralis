import React, { useState, useEffect, updateState } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Button,
  Link,
  Input,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Moralis } from "moralis";

function ShowMemes({ results, fetchUsersMemes, web3JS, memeSaleContract }) {
  const [price, setPrice] = useState();

  const currentUser = Moralis.User.current();
  const memes = results.map((meme, i) => (
    <Box
      mb={4}
      pb={4}
      align="center"
      bg="#2a9d8f"
      style={{ borderRadius: "15px" }}
    >
      {/* SHOWS MEME DATA */}
      <Box
        width="90%"
        p={2}
        m={2}
        bg="#1d3557"
        style={{ borderRadius: "15px" }}
      >
        <Text key={`Title` + meme.id}>
          <strong>Title: </strong>
          {meme.attributes.memeName}
        </Text>
        <Text key={`Description` + meme.id}>
          <strong>Description: </strong>
          {meme.attributes.description}
        </Text>
        <Text key={`Owner` + meme.id}>
          <strong>Meme Owner: </strong>{" "}
          {meme.attributes.owner.attributes.username}
        </Text>
        <Text>
          <strong>Hash: </strong> {meme.attributes.hash}
        </Text>
        <Text>
          <strong>Metadata: </strong>
          <Link href={meme.attributes.metadata} isExternal>
            {meme.attributes.metadata} <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Box>
      {/* SHOWS MEME IMAGE */}
      <Image
        style={{ borderRadius: "15px" }}
        boxSize="400px"
        src={meme.attributes.ipfs}
        alt={meme.attributes.name}
      />
      {/* SHOWS COMMENTS SECTION IF ANY COMMENTS */}
      {meme.attributes.comments && (
        <Box
          align="center"
          width="100%"
          bg="blue"
          style={{ borderRadius: "15px", padding: "30px" }}
        >
          {meme.attributes.comments !== undefined &&
            meme.attributes.comments.length > 0 && (
              <Text>
                <strong>Comments: </strong>
                {meme.attributes.comments.map(
                  (a) => a.user + ": " + a.comment + "\r"
                )}
              </Text>
            )}
        </Box>
      )}
      {/* SHOWS VOTE COUNT FOR MEME */}
      <Box
        mt={1}
        align="center"
        width="30%"
        bg="blue"
        style={{ borderRadius: "15px" }}
      >
        <Text>
          <strong>Votes: </strong>
          {meme.attributes.votes}
        </Text>
      </Box>
      {/* SHOWS PRICE IF IS ON SALE */}
      {meme.attributes.isOnSale === true && (
        <Box
          bg="green"
          style={{ borderRadius: "15px" }}
          width="max-content"
          p={1}
        >
          <Text>On Sale!</Text>
          <Text>Price: {meme.attributes.price} MATIC</Text>
        </Box>
      )}
      {/* DELETES MEME */}
      <Button
        size="sm"
        mt={1}
        border="2px"
        borderColor="black"
        onClick={async () => {
          const Memes = Moralis.Object.extend("Memes");
          const query = new Moralis.Query(Memes);
          const toDelete = await query.get(meme.id);
          await toDelete.destroy();
        }}
      >
        Delete Meme
      </Button>
      {/* PUTS MEME ON SALE */}
      {meme.attributes.isOnSale === false && (
        <Box mt={2}>
          <Input
            placeholder="price in MATIC"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <Button
            onClick={async () => {
              let signature;
              let r;
              let s;
              let v;
              let message = meme.id + price;
              // console.log(message);
              try {
                signature = await web3JS.eth.personal.sign(
                  message,
                  window.ethereum.selectedAddress
                );
                r = signature.substring(2).substring(0, 64);
                s = signature.substring(2).substring(64, 128);
                v = signature.substring(2).substring(128, 130);
                const Memes = Moralis.Object.extend("Memes");
                const query = new Moralis.Query(Memes);
                const toUpdate = await query.get(meme.id);

                await toUpdate.set("signature", signature);
                await toUpdate.save();
                await toUpdate.set("price", parseFloat(price));
                await toUpdate.save();
                await toUpdate.set("v", v);
                await toUpdate.save();
                await toUpdate.set("r", r);
                await toUpdate.save();
                await toUpdate.set("s", s);
                await toUpdate.save();
                await toUpdate.set("isOnSale", true);
                await toUpdate.save();

                const tokenId = toUpdate.attributes.tokenId;
                console.log(tokenId);
                let res;
                try {
                  res = await memeSaleContract.methods
                    .putOnSale(tokenId)
                    .send({ from: window.ethereum.selectedAddress });
                  console.log(res);
                } catch (error) {
                  alert(
                    "There has been an error, please check console for more information!"
                  );
                  console.error(error);
                  console.log(res);
                }

                setPrice();
                // console.log("SIGNATURE", signature);
                // console.log("price", price);
                // console.log("r", r);
                // console.log("s", s);
                // console.log("v", v);
              } catch (error) {
                console.error(error);
              }
              // console.log(signature);
              // console.log(
              //   "Signed by: ",
              //   await web3JS.eth.accounts.recover(message, signature)
              // );
            }}
          >
            Put on Sale
          </Button>
        </Box>
      )}
      {/* REMOVES MEME FROM SALE */}
      {meme.attributes.isOnSale === true && (
        <Box>
          <Button
            onClick={async () => {
              try {
                const Memes = Moralis.Object.extend("Memes");
                const query = new Moralis.Query(Memes);
                const toUpdate = await query.get(meme.id);

                toUpdate.set("signature", "");
                toUpdate.save();
                toUpdate.set("price", 0);
                toUpdate.save();
                toUpdate.set("r", "");
                toUpdate.save();
                toUpdate.set("s", "");
                toUpdate.save();
                toUpdate.set("v", "");
                toUpdate.save();
                toUpdate.set("isOnSale", false);
                toUpdate.save();

                const tokenId = toUpdate.attributes.tokenId;
                try {
                  let res = await memeSaleContract.methods
                    .removeFromSale(tokenId)
                    .send({ from: window.ethereum.selectedAddress });
                  console.log(res);
                } catch (error) {
                  console.error(error);
                }
              } catch (error) {
                alert(
                  "There has been an error, please check console for more information!"
                );
                console.error(error);
              }
            }}
          >
            Remove from Sale
          </Button>
        </Box>
      )}
      {/* CHANGES PRICE */}
      {meme.attributes.isOnSale === true && (
        <Box>
          <Button
            onClick={async () => {
              let signature;
              let r;
              let s;
              let v;
              let message = meme.id + price;
              // console.log(message);
              try {
                signature = await web3JS.eth.personal.sign(
                  message,
                  window.ethereum.selectedAddress
                );
                r = signature.substring(2).substring(0, 64);
                s = signature.substring(2).substring(64, 128);
                v = signature.substring(2).substring(128, 130);
                const Memes = Moralis.Object.extend("Memes");
                const query = new Moralis.Query(Memes);
                const toUpdate = await query.get(meme.id);

                await toUpdate.set("signature", signature);
                await toUpdate.save();
                await toUpdate.set("price", parseFloat(price));
                await toUpdate.save();
                await toUpdate.set("v", v);
                await toUpdate.save();
                await toUpdate.set("r", r);
                await toUpdate.save();
                await toUpdate.set("s", s);
                await toUpdate.save();
                await toUpdate.set("isOnSale", true);
                await toUpdate.save();

                setPrice("");

                //SETS PUT ON SALE BOOL IN MEME SALE CONTRACT - NO LONGER NEEDED?
                // const tokenId = toUpdate.attributes.tokenId;
                // try {
                //   let res = await memeSaleContract.methods
                //     .putOnSale(tokenId)
                //     .send({ from: window.ethereum.selectedAddress });
                //   console.log(res);
                // } catch (error) {
                //   alert(
                //     "There has been an error, please check console for more information!"
                //   );
                //   console.error(error);
                // }

                // console.log("SIGNATURE", signature);
                // console.log("price", price);
                // console.log("r", r);
                // console.log("s", s);
                // console.log("v", v);
              } catch (error) {
                console.error(error);
              }
              console.log(signature);
              console.log(
                "Signed by: ",
                await web3JS.eth.accounts.recover(message, signature)
              );
            }}
          >
            Change Price
          </Button>
          <Input
            placeholder="new price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
      )}
    </Box>
  ));

  useEffect(async () => {
    fetchUsersMemes();
    let query = new Moralis.Query("Memes");
    let subscription = await query.subscribe();
    subscription.on("create", fetchUsersMemes);
    subscription.on("update", fetchUsersMemes);
    subscription.on("delete", fetchUsersMemes);
  }, []);

  return (
    <>
      <Box
        m={1}
        bg="#1d3557"
        style={{ borderRadius: "15px" }}
        align="center"
        align="center"
      >
        <Heading>Your Memes:</Heading>
      </Box>
      <Button
        onClick={async () => {
          let memes = await Moralis.Cloud.run("fetchAllMemes");
          console.log("ALLMEMES", memes);
          const filteredMemes = memes.filter((meme) => {
            return meme.voters.find(
              (currentVoter) => currentVoter.voter === currentUser.id
            );
          });
          console.log("MyVotedMemes", filteredMemes);
        }}
      >
        FetchMyVotes
      </Button>
      <Stack spacing={7}>{memes}</Stack>
    </>
  );
}

export default ShowMemes;
