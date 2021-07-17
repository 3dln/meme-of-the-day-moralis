import React, { useState, useEffect } from "react";
import Moralis from "moralis";

import { Container, Heading, Text, Image, Button, Box } from "@chakra-ui/react";

function MemeOfTheDay() {
  const [ranking, setRanking] = useState();

  useEffect(async () => {
    fetchMemeOfTheDay();
    let query = new Moralis.Query("Memes");
    let subscription = await query.subscribe();
    subscription.on("update", fetchMemeOfTheDay);
    subscription.on("delete", fetchMemeOfTheDay);
  }, []);

  const fetchMemeOfTheDay = async () => {
    let memes = await Moralis.Cloud.run("fetchAllMemes");
    // console.log(memes);

    //Filters out all memes by vote count of last 24hours!
    let oneDay = 24 * 60 * 60 * 1000;
    let posts = [];
    const filteredMemes = memes.filter((meme) => {
      return meme.voters.find((currentTimestamp) =>
        currentTimestamp.timestamp >= Date.now() - oneDay
          ? posts.push(meme)
          : ""
      );
    });
    // console.log("FM", filteredMemes);
    const highestVotes = filteredMemes.sort((a, b) => {
      return b.voters.length - a.voters.length;
    });
    //empty State
    setRanking();
    //set state with new data
    setRanking(highestVotes);
  };

  return (
    <Box align="center">
      {ranking && ranking.length > 0 ? (
        <Box bg="#264653" mb={4} p={1} style={{ borderRadius: "15px" }}>
          <Text fontSize="3xl">Meme of the Day charts 24 hours</Text>
        </Box>
      ) : (
        "There are no memes "
      )}
      {ranking
        ? ranking.map((ranking, i) => (
            <Box
              mb={4}
              pb={4}
              align="center"
              bg="#2a9d8f"
              style={{ borderRadius: "15px" }}
            >
              <Box
                bg="#1d3557"
                width="50%"
                style={{ borderRadius: "0 0 15px 15px" }}
              >
                <Text fontSize="3xl">{"Rank " + (i + 1)}</Text>
                <Text>{"Title: " + ranking.memeName}</Text>
                <Text>{"Votes: " + ranking.voters.length}</Text>
              </Box>
              <Image
                p={4}
                src={ranking.file._url}
                alt={ranking.memeName}
                style={{ borderRadius: "30px" }}
              />
              {ranking.isOnSale === true && (
                <Box>
                  <Text>On Sale!</Text>
                  <Text>Price: {ranking.price} MATIC</Text>
                </Box>
              )}
            </Box>
          ))
        : ""}
    </Box>
  );
}

export default MemeOfTheDay;
