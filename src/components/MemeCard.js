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
import { forEach } from "lodash";

function MemeCard() {
  const [ranking, setRanking] = useState();

  const sampleComment = [
    {
      avatar: "ML",
      user: "Matthew",
      comment: "This meme is sooooo funnnnny!!!!",
    },
    {
      avatar: "SH",
      user: "Memes890",
      comment:
        " This meme is sooooo funnnnny!!!! Makes me think of that time when I was attacked by a spider...",
    },
    {
      avatar: "SH",
      user: "Memes890",
      comment:
        " This meme is sooooo funnnnny!!!! Makes me think of that time when I was attacked by a spider...",
    },
  ];

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
      <div class="flex flex-col bg-white px-4 py-4">
        <div class="relative">
          <img
            src={spidertest} //{ranking.file._url}
            alt="test spider meme" //{ranking.memeName}
            class="object-cover border-2 border-black-600"
          />
          <div class="absolute bottom-0 left-0">
            <p class="bg-motdblue px-4 py-2 text-motdblack font-normal">
              10 VOTES
            </p>
            {/* <div class="absolute bottom-0 left-0 w-5  overflow-hidden inline-block">
              <div class=" h-16  bg-black -rotate-45 transform origin-top-left"></div>
            </div> */}
          </div>
        </div>
        <form class="flex-auto py-4">
          <div class="flex mb-4 text-sm font-medium">
            <div class="flex-auto flex ">
              <button
                class="flex items-center justify-center bg-motdblack text-white px-4 py-2"
                type="submit"
              >
                <img
                  src={heart} //{ranking.file._url}
                  alt="heart icon" //{ranking.memeName}
                  class="pr-2 h-3"
                />
                VOTE
              </button>
              <button
                class="flex-none flex items-center justify-center px-5 py-2"
                type="button"
                aria-label="share"
              >
                <img src={share} alt="share button" />
              </button>
              <button
                class="flex-none flex items-center justify-center px-1.5 py-2"
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
                class="flex items-center justify-center bg-motdblack px-4 py-2"
                type="button"
              >
                BID
              </button>
              <button
                class="flex items-center justify-center bg-motdblue text-motdblack px-4 py-2 ml-3"
                type="button"
              >
                PURCHASE
              </button>
            </div>
          </div>
          <button type="button">
            <p class="text-sm text-gray-500 font-ssp">View all comments</p>
          </button>
          {sampleComment ? (
            sampleComment.map((comment) => {
              return (
                <div class="font-ssp text-motdblack mt-2 mb-2">
                  <div class="inline-flex">
                    <p class="bg-motdblue px-1 mr-1 font-anton">
                      {comment.avatar}
                    </p>
                    <p class="font-bold mr-2">{comment.user}</p>
                  </div>
                  <p class="inline">{comment.comment}</p>
                </div>
              );
            })
          ) : (
            <div>No</div>
          )}
        </form>
      </div>
      {/* ))
        : ""} */}
    </div>
  );
}

export default MemeCard;
