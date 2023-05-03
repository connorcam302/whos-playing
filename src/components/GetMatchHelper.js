import { React, useEffect, useState } from "react";
import AllMatchCard from "./AllMatchCard";
import {
  Box,
  Center,
  Flex,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const GetMatchHelper = (props) => {
  const [matches, setMatches] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getMatches = () => {
    fetch(`/api/matches/player/${props.playerid}?page=${props.pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoaded(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMatches();
  }, []);
  if(loaded){
  return (
    <Box>
      <Center>
        <AllMatchCard matches={matches} card={props.card}/>
      </Center>
    </Box>
  )} else {
    return (
      <Center paddingTop={10}>
        <Spinner color='white.reg' size='xl' />
      </Center>
    )
  }
};
export default GetMatchHelper;
