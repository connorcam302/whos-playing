import { React, useEffect, useState } from "react";
import AllMatchCard from "./AllMatchCard";
import { Box, Center, Flex, Heading, Spinner, Stack, Wrap, WrapItem } from "@chakra-ui/react";

const GetMatchHelper = (props) => {
  const [matches, setMatches] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [didTimeout, setDidTimeout] = useState(false);

  const getMatches = () => {
    fetch(`/api/matches/player/${props.playerid}?page=${props.pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMatches();
  }, []);

  setTimeout(function () {
    setDidTimeout(true);
  }, 15000);

  if (loaded) {
    return (
      <Box>
        <Center>
          <AllMatchCard matches={matches} card={props.card} />
        </Center>
      </Box>
    );
  } else if (!loaded && !didTimeout) {
    return (
      <Center paddingTop={10}>11
        <Spinner color='white.reg' size='xl' />
      </Center>
    );
  } else {
    return (
      <>
        <Center paddingTop={10}>
          <Spinner color='white.reg' size='xl' />
        </Center>
        <Center paddingTop={10}>
          <Heading>Request possibly timed out, try refreshing.</Heading>
        </Center>
      </>
    );
  }
};
export default GetMatchHelper;
