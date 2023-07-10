import GetMatchHelper from "../components/GetMatchHelper";
import PageButtons from "../components/PageButtons";
import { Box, Center, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FilterBox from "../components/FilterBox";

export default function MatchPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const increasePage = () => {
    setPage(page + 1);
  };
  const decreasePage = () => {
    if (!page == 0) {
      setPage(page - 1);
    }
  };



  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }
  var width = useWindowSize().width;

  const [hero, setHero] = useState("all");
  const [player, setPlayer] = useState("all");
  const [refresh, setRefresh] = useState("all");

  useEffect(() => {
    console.log("refreshing");
    setRefresh(0);
  }, [refresh]);

  if (width >= 1100) {
    return (
      <>
        <Helmet>
          <title>Matches</title>
        </Helmet>
        <Box h="2em" />
        <Center>
          <Box>
            <FilterBox
              heroState={setHero}
              playerState={setPlayer}
              refreshButton={setRefresh}
              playerOption={true}
            />
            <GetMatchHelper
              key={page}
              playerid={player}
              heroid={hero}
              pageNumber={page}
            />
            <PageButtons increase={increasePage} decrease={decreasePage} />
          </Box>
        </Center>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Matches</title>
        </Helmet>
        <Center>
          <Stack>
            <FilterBox
              heroState={setHero}
              playerState={setPlayer}
              refreshButton={setRefresh}
              playerOption={true}
            />
            <GetMatchHelper
              key={page}
              playerid={player}
              heroid={hero}
              pageNumber={page}
              card="true"
            />
            <PageButtons increase={increasePage} decrease={decreasePage} pageNumber={page}/>
          </Stack>
        </Center>
      </>
    );
  }
}
