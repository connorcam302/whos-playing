import { React, useEffect, useState } from "react";
import AllMatchCard from "./AllMatchCard";
import {
  Box,
  Center,
  Flex,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const GetMatchHelper = (props) => {
  const [matches, setMatches] = useState([]);

  const getMatches = () => {
    fetch(`/api/matches/player/${props.playerid}`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMatches();
  }, []);

  return (
    <Box>
      <Center>
        <AllMatchCard matches={matches} />
      </Center>
    </Box>
  );
};
export default GetMatchHelper;
