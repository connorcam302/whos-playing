import { Box, Button, Center, Code, Heading, Link, LinkOverlay, ListItem, Select, Spacer, Stack, Text, UnorderedList, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Statbox from "@/components/Statbox";
import { Helmet } from "react-helmet";
import Image from "next/image";
import { CopyBlock, dracula } from "react-code-blocks";

var code = `// Javascript

var csMin = match.last_hits / (match.duration / 60);
var role = csMin > 3.5 ? "core" : "support";
if (role === "core") {
  var kapmRating = ((match.kills * 2.5 + match.assists * 0.5)/(match.duration / 60)) ** 2;
  var deathRating = 3 / (match.deaths + 1);
  var csMinRating = csMin ** 1.5 / 20;
  var impact = kapmRating * 0.4 + deathRating * 0.4 + csMinRating * 0.2;
} else {
  var kapmRating = ((match.kills + match.assists * 1.65) / (match.duration / 60)) ** 2;
  var deathRating = 5 / (match.deaths + 1.5);
  var impact = kapmRating * 0.4 + deathRating * 0.6;
}
return Math.floor(impact * 100) ;`;

export default function MatchPage() {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Navbar>
        <Center>
          <Stack w='50em' spacing={8}>
            <Heading size='2xl'>General</Heading>
            <Box>
              <Heading size='lg' alignContent='left'>
                How is score calculated?
              </Heading>
              <Stack spacing={2}>
                <Text>Score assigns an impact rating to each player in a match, this is done using the following algorithm: </Text>
                <CopyBlock language='js' text={code} theme={dracula} />
                <Text>
                  In short, the player being core or support is determined by their last hits per minute, if they are a core then their impact is
                  calculated including this, for supports it is not. From here score is calculated for kill and assists perminute, deaths and last
                  hits per minute. These are then weighted 2:2:1 and added together to give a final score.
                </Text>
                <Text>
                  For supports a slightly different algorithm is used, kill and assist score is weighted more towards assists with less value to kills
                  but more for assists and death score is more forgiving with the optimal number of deaths sitting around 7.5 where for cores it lies
                  around 4. After this the score is calulated using an a weighted score of the two in a ratio of 2:3 kill and assist score to death
                  score.
                </Text>
                <Text>
                  After this a score is given with S+ being any score above 100 and the other ranks scaling downwards in increments of 5 with D-
                  sitting at anything below 35. This score is <b>very</b> much a work in progress and will likely change a lot as more data is added.
                </Text>
              </Stack>
            </Box>
            <Box>
              <Heading size='lg' alignContent='left'>
                Planned features?
              </Heading>
              <Stack spacing={2}>
                <Text>The following features are planned but have no guarantee of being added:</Text>
                <Text>
                  <UnorderedList>
                    <ListItem>Top Matches</ListItem>
                    <ListItem>Reworked Match Display</ListItem>
                    <ListItem>Top Players on Heroes</ListItem>
                    <ListItem>Filters on Matches Page</ListItem>
                    <ListItem>Ranks on Player Profile</ListItem>
                  </UnorderedList>
                </Text>
              </Stack>
            </Box>
            <Heading size='2xl'>Data</Heading>
            <Box>
              <Heading size='lg' alignContent='left'>
                Where does the data come from?
              </Heading>
              <Text>
                Data is taken from two different public API, the Steam IDOTA2Match_570 API and the OpenDota API. Majority of the data is taken from
                IDOTA2Match_570 then where possible OpenDota data is mixed in, however this data is inconsistent as it relies on being underneath the
                maximum number of requests and the match being parsed on the website, to combat this, reliability on this API is almost as low as
                possible.
              </Text>
            </Box>
            <Box>
              <Heading size='lg' alignContent='left'>
                Is data stored?
              </Heading>
              <Text>
                Due to the speed of both of these API data has to be cached inside of a database. This database is secured and only accessible using a
                key however the nature of the data is all public regardless making the sensitivity of the data low.
              </Text>
            </Box>
            <Heading size='2xl'>Stack</Heading>
            <Box>
              <Heading size='lg' alignContent='left'>
                How does the application work?
              </Heading>
              <Text>
                Using an AWS Lightsail container running Ubuntu, data is scaped from both of the API and written to the Postgres database hosted on
                Supabase. From here data can be read by the application. The host of the application, Vercel, offers a built in CI/CD pipeline that
                works with GitHub meaning that code just has to be merged to the deployment branch and it will be deployed automatically. The overall
                architecture looks something like the following:
              </Text>
              <Box bg='gray.600' p='1em' borderRadius={10} marginTop='1em'>
                <Image src='/stack.png' alt='stack' width={1000} height={500} />
              </Box>
            </Box>
            <Box>
              <Heading size='lg' alignContent='left'>
                What is the application built with?
              </Heading>
              <Text>
                The application is built using Next.js manages both front and backend and ChakraUI for the frontend components. Next.js is a framework
                that is written in both React and NodeJS. The database layer of the application is written in PostgreSQL. The application code, other
                than the database layer can be found on{" "}
                <Link color='teal.200' src='https://github.com/connorcam302/whos-playing'>
                  GitHub.
                </Link>
              </Text>
            </Box>
          </Stack>
        </Center>
        <Box h="3em"/>
      </Navbar>
    </>
  );
}
