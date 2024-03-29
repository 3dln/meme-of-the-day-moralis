import React, {useState, useEffect, useRef } from 'react'
import Moralis from 'moralis'
import { Box, Image, Text, Heading, Stack, Button, Input  } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Search() {
    const [titleSearch, setTitleSearch] = useState("");
    const [descriptionSearch, setDescriptionSearch] = useState("");
    const [searchResult, setSearchResult] = useState();
    const descriptionRef = useRef();
    const titleRef = useRef();


    const handleDescriptionChange = async (e) => {
        setDescriptionSearch(e.target.value);
        searchForDescription();
    }

    const handleTitleChange = async (e) => {
        setTitleSearch(e.target.value);

        searchForTitle();
    }

    const searchForTitle = async () => {
        if(titleSearch === ""){
            return;
        }
        let result = await Moralis.Cloud.run(
            "searchTitles",
            {
              titleSearch: titleSearch,
             
            }
          );
        console.log(result);
        const memes = result.map((meme) => (
            <Box mt={1} p={2} align="center" bg="#2a9d8f" style={{borderRadius: "15px"}}>
                <Box width="90%" p={2} m={2} bg="#1d3557" style={{borderRadius: "15px"}}>
            <Text key={`Title` + meme.id}>
              <strong>Title: </strong>
              {meme.attributes.memeName}
            </Text>
            <Text key={`Description` + meme.id}>
              <strong>Description: </strong>
              {meme.attributes.description}
            </Text>
            <Text>
              <strong>Hash: </strong> {meme.attributes.hash}
            </Text>
            <Text>
              <strong>Metadata: </strong> {meme.attributes.metadata}
            </Text>
            </Box>
            <Image
               p={1}
               style={{borderRadius: "15px"}}
                 boxSize="400px"
              src={meme.attributes.ipfs}
              alt={meme.attributes.name}
            />
             <Box align="center" width="30%" bg="blue" style={{borderRadius: "15px"}}>
            <Text>
              <strong>Votes: </strong>
              {meme.attributes.votes}
            </Text>
            </Box>
          </Box>
        )
    
        )
        setSearchResult(memes);
       // titleRef.current.value = "";
    }

    
    const searchForDescription = async () => {
        if(descriptionSearch === ""){
            return;
        }
        let result = await Moralis.Cloud.run(
            "searchDescriptions",
            {
                descr: descriptionSearch,
             
            }
          );
        console.log(result);
        const memes = result.map((meme) => (
            <Box m={4} p={2} align="center" bg="#2a9d8f" style={{borderRadius: "15px"}}>
                <Box width="90%" p={2} m={2} bg="#1d3557" style={{borderRadius: "15px"}}>
            <Text key={`Title` + meme.id}>
              <strong>Title: </strong>
              {meme.attributes.memeName}
            </Text>
            <Text key={`Description` + meme.id}>
              <strong>Description: </strong>
              {meme.attributes.description}
            </Text>
            <Text>
              <strong>Hash: </strong> {meme.attributes.hash}
            </Text>
            <Text>
              <strong>Metadata: </strong> {meme.attributes.metadata}
            </Text>
            </Box>
            <Image
               p={1}
               style={{borderRadius: "15px"}}
                 boxSize="400px"
              src={meme.attributes.ipfs}
              alt={meme.attributes.name}
            />
             <Box align="center" width="30%" bg="blue" style={{borderRadius: "15px"}}>
            <Text>
              <strong>Votes: </strong>
              {meme.attributes.votes}
            </Text>
            </Box>
          </Box>
          
        )
    
        )
        setSearchResult(memes);
        //descriptionRef.current.value = "";    
    }



    return (
        <Box>
            <Tabs isFitted>
                <TabList>
                    <Tab>Title Search</Tab>
                    <Tab>Description Search</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Input placeholder="search for title" onChange={(e) => handleTitleChange(e)} ref={titleRef} value={titleSearch} />
                        <Button mt={2} onClick={() => searchForTitle()}>Search</Button>
                    </TabPanel> 
                    <TabPanel > 
                        <Input placeholder="search for description" onChange={(e) => handleDescriptionChange(e)} ref={descriptionRef} value={descriptionSearch} />
                        <Button mt={2} onClick={() => searchForDescription()}>Search</Button>
                    </TabPanel> 
                </TabPanels>
            </Tabs>
            <Text>{searchResult && searchResult.length > 0 ? 
                <Box>{searchResult}</Box>
             : "No results, start typing to search the Meme Archive"}</Text>            
        </Box>
    )
}

export default Search
