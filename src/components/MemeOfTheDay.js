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
    console.log(memes);
    let oneDay = 24 * 60 * 60 * 1000;
    console.log(oneDay);
    let posts = [];
    const filteredMemes = memes.filter((meme) => {
      return meme.voters.find((currentTimestamp) =>
        currentTimestamp.timestamp >= Date.now() - oneDay
          ? posts.push(meme)
          : ""
      );
    });
    console.log("FM", filteredMemes);
    const highestVotes = filteredMemes.sort((a, b) => {
      return b.voters.length - a.voters.length;
    });
    setRanking();
    setRanking(highestVotes);
  };

  return (
    <Box>
      <Text fontSize="3xl">Meme of the day 24 hours ranking</Text>
      {ranking
        ? ranking.map((ranking, i) => (
            <Box mb={4}>
              <Text fontSize="3xl">
                {"Rank " +
                  i +
                  " " +
                  ranking.memeName +
                  " with " +
                  ranking.voters.length +
                  " votes in the last 24 hours"}
              </Text>
              <img src={ranking.file._url} alt={ranking.memeName} />
            </Box>
          ))
        : ""}
    </Box>
  );
}

export default MemeOfTheDay;
