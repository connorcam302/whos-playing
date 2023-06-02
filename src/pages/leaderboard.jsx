import Statbox from "../components/Statbox";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function MatchPage() {
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

  const [players, setPlayers] = useState([]);
  const [loaded, setLoaded] = useState([]);
  // const getLeaderboard = () => {
  //   fetch(`/api/leaderboard`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPlayers(data);
  //       setLoaded(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  useEffect(() => {
    setPlayers(list);
  }, []);

  let list = [
    { id: 312271581, name: "Sighboys", rank: 80, leaderboard: 3397 },
    { id: 231268625, name: "Matthew", rank: 80 },
    { id: 80370391, name: "Bingham", rank: 80 },
    { id: 131178836, name: "Harry", rank: 80 },
    { id: 294548916, name: "Colfox", rank: 71 },
    { id: 229886086, name: "Callum", rank: 71 },
    { id: 106505218, name: "Tom", rank: 64 },
    { id: 313381411, name: "Brock", rank: 63 },
    { id: 110099229, name: "Dom", rank: 61 },
    { id: 132022693, name: "Steve", rank: 54 },
    { id: 198739564, name: "Sam", rank: 42 },
    { id: 100848859, name: "Liam", rank: 41 },
    { id: 80321157, name: "Joe", rank: 34 },
    { id: 328412884, name: "Shane", rank: -1 },
    { id: 258517108, name: "Frenchy", rank: -1 },
    { id: 132939229, name: "Phil", rank: -1 },
    { id: 110022302, name: "Evan", rank: -1 },
  ];

  return (
    <>
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <Center margin={5}>
        <Stack spacing={0}>
          {players.map((player, index) => (
            <Wrap
              backgroundColor={index % 2 == 0 ? "#242c36" : "#2c3642"}
              w={"30em"}
              paddingLeft={"1.5em"}
              paddingRight={"2em"}
              key={index}
            >
              <Center w="2em">
                <Heading textAlign={"right"}>{`${index + 1}. `}</Heading>
              </Center>
              <Center paddingLeft={"0.5em"}>
                <Heading>{player.name}</Heading>
              </Center>
              <Spacer />
              <Center paddingTop={"0.2em"} paddingBottom={"0.2em"} w={"4em"}>
                <Box
                  backgroundImage={ranks[player.rank]}
                  backgroundPosition={"center"}
                  backgroundSize={"contain"}
                  backgroundRepeat={"no-repeat"}
                  w={"3.5em"}
                  h={"3.5em"}
                >
                  <Center paddingTop="2.1em">
                    <Text fontWeight="bold" textShadow="2px 2px 10px black">{player.leaderboard}</Text>
                  </Center>
                </Box>
              </Center>
            </Wrap>
          ))}
        </Stack>
      </Center>
    </>
  );
  //   } else {
  //     return (
  //       <>
  //         <Helmet>
  //           <title>Leaderboard</title>
  //         </Helmet>
  //         <Center margin={5}></Center>
  //       </>
  //     );
  //   }
}
const ranks = [];
ranks["11"] = "SeasonalRank1-1.png";
ranks["12"] = "SeasonalRank1-2.png";
ranks["13"] = "SeasonalRank1-3.png";
ranks["14"] = "SeasonalRank1-4.png";
ranks["15"] = "SeasonalRank1-5.png";
ranks["21"] = "SeasonalRank2-1.png";
ranks["22"] = "SeasonalRank2-2.png";
ranks["23"] = "SeasonalRank2-3.png";
ranks["24"] = "SeasonalRank2-4.png";
ranks["25"] = "SeasonalRank2-5.png";
ranks["31"] = "SeasonalRank3-1.png";
ranks["32"] = "SeasonalRank3-2.png";
ranks["33"] = "SeasonalRank3-3.png";
ranks["34"] = "SeasonalRank3-4.png";
ranks["35"] = "SeasonalRank3-5.png";
ranks["41"] = "SeasonalRank4-1.png";
ranks["42"] = "SeasonalRank4-2.png";
ranks["43"] = "SeasonalRank4-3.png";
ranks["44"] = "SeasonalRank4-4.png";
ranks["45"] = "SeasonalRank4-5.png";
ranks["51"] = "SeasonalRank5-1.png";
ranks["52"] = "SeasonalRank5-2.png";
ranks["53"] = "SeasonalRank5-3.png";
ranks["54"] = "SeasonalRank5-4.png";
ranks["55"] = "SeasonalRank5-5.png";
ranks["61"] = "SeasonalRank6-1.png";
ranks["62"] = "SeasonalRank6-2.png";
ranks["63"] = "SeasonalRank6-3.png";
ranks["64"] = "SeasonalRank6-4.png";
ranks["65"] = "SeasonalRank6-5.png";
ranks["71"] = "SeasonalRank7-1.png";
ranks["72"] = "SeasonalRank7-2.png";
ranks["73"] = "SeasonalRank7-3.png";
ranks["74"] = "SeasonalRank7-4.png";
ranks["75"] = "SeasonalRank7-5.png";
ranks["80"] = "SeasonalRankTop0.png";
ranks["-1"] = "SeasonalRank0-0.png";
