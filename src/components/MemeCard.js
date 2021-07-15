import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import {
  Container,
  Heading,
  Text,
  Image,
  Button,
  Box,
  AbsoluteCenter,
} from "@chakra-ui/react";
import "tailwindcss/tailwind.css";
import share from "../img/share.svg";
import heart from "../img/heart.svg";
import dots from "../img/dots.svg";
import star from "../img/star.svg";
import spidertest from "../img/spidertest.png";

function MemeCard() {
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
    <div class="font-anton">
      {/* {ranking
        ? ranking.map((ranking, i) => ( */}
      <div class="flex flex-col bg-white px-4 py-2">
        <div class="relative">
          <img
            src={spidertest} //{ranking.file._url}
            alt="test spider meme" //{ranking.memeName}
            class="object-cover border-2 border-black-600"
          />
          <p class="absolute bottom-0 left-0 bg-primary px-4 py-2 text-black font-normal">
            10 VOTES
          </p>
        </div>
        <form class="flex-auto py-4">
          <div class="flex space-x-3 mb-4 text-sm font-medium">
            <div class="flex-auto flex space-x-3">
              <button
                class="flex items-center justify-center bg-black text-white px-4 py-2"
                type="submit"
              >
                <img
                  src={heart} //{ranking.file._url}
                  alt="heart icon" //{ranking.memeName}
                />
                VOTE
              </button>
              <button
                class="flex-none flex items-center justify-center px-4 py-2"
                type="button"
                aria-label="share"
              >
                <img src={share} alt="share button" />
              </button>
              <button
                class="flex-none flex items-center justify-center px-4 py-2"
                type="button"
                aria-label="share"
              >
                <img src={dots} alt="dots button" />
              </button>
            </div>
            <div class="flex">
              <button
                class="flex-none flex items-center justify-center px-4 py-2"
                type="button"
                aria-label="share"
              >
                <img
                  src={star}
                  alt="star button"
                  class="object-cover border-2 border-black-600"
                />
              </button>
              <button
                class="flex items-center justify-center bg-black px-4 py-2"
                type="button"
              >
                BID
              </button>
              <button
                class="flex items-center justify-center bg-primary text-black px-4 py-2"
                type="button"
              >
                PURCHASE
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-500 font-ssp">View all comments</p>
        </form>
      </div>
      {/* ))
        : ""} */}
    </div>
  );
}

export default MemeCard;
