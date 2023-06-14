import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import MatchModal from "./MatchModal";

export default function MatchRow(props) {
  if (props.match.status != 404) {
    return (
      <MatchModal matchid={props.match.match_id}>
        <Box
          // bgColor={"linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)"}
          bg={
            props.match.winner == true
              ? "linear-gradient(to left, #242c36, #242c36, #2f4c39)"
              : "linear-gradient(to left, #242c36, #242c36, #AA4344)"
          }
          border="2px"
          _hover={{
            background:
              props.match.winner == true
                ? "linear-gradient(to left, #242c36, #2f4c39)"
                : "linear-gradient(to left, #242c36, #AA4344)",
            transition: "0.5s",
            border: "2px solid #808080",
            cursor: "pointer",
          }}
          marginBottom="5px"
        >
          <Flex>
            <Center>
              <Tooltip label={props.match.hero.name}>
                <Image
                  w="130px"
                  minW="130px"
                  objectFit="contain"
                  paddingRight="30px"
                  src={props.match.hero.img}
                  alt={props.match.hero.name}
                />
              </Tooltip>
            </Center>
            <Center>
              <Wrap>
                <Center>
                  <Flex w="7em" paddingRight="10px">
                    <Center>
                      <Link
                        href={"/player/" + props.match.player_id}
                        passHref
                        legacyBehavior
                      >
                        <a rel="noopener noreferrer">
                          <Heading
                            _hover={{
                              color: "#808080",
                              transition: "0.3s",
                            }}
                            size="md"
                          >
                            {props.match.username}
                          </Heading>
                        </a>
                      </Link>
                    </Center>
                    <Spacer />
                  </Flex>
                </Center>
                <Center>
                  <Box w="4em">
                    <Heading size="md">
                      {makeWinnerText(props.match.winner)}
                    </Heading>
                  </Box>
                </Center>
                <Flex w="1em" paddingRight="10px">
                  <Tooltip label={"Impact Score: "+props.match.impact}>
                    <Center>
                      <Heading
                        color={
                          calcImpact(props.match.impact) == "S+"
                            ? "gold"
                            : "#ffffff"
                        }
                        size="md"
                        marginLeft="0.5em"
                        sx={
                          calcImpact(props.match.impact) == "S+"
                            ? {
                                textShadow:
                                  "1px 1px 20px #fff, 1px 1px 20px #ccc;",
                              }
                            : ""
                        }
                      >
                        {calcImpact(props.match.impact)}
                      </Heading>
                    </Center>
                  </Tooltip>
                </Flex>
                <Center>
                  <Box w="7em" paddingRight="10px" paddingLeft="10px">
                    <Text fontWeight="bold" textAlign="center">
                      {props.match.kills}/{props.match.deaths}/
                      {props.match.assists}
                    </Text>
                    <Text textAlign="center">
                      {Math.floor(props.match.duration / 60)}:
                      {Math.round(props.match.duration % 60) >= 10
                        ? Math.round(props.match.duration % 60)
                        : "0" + Math.round(props.match.duration % 60)}
                    </Text>
                  </Box>
                </Center>
                <Box bg="#212121">
                  <Box>
                    <Wrap spacing="0px">
                      {makeItemBox(props.match.items[0])}
                      {makeItemBox(props.match.items[1])}
                      {makeItemBox(props.match.items[2])}
                    </Wrap>
                  </Box>
                  <Box>
                    <Wrap spacing="0px">
                      {makeItemBox(props.match.items[3])}
                      {makeItemBox(props.match.items[4])}
                      {makeItemBox(props.match.items[5])}
                    </Wrap>
                  </Box>
                </Box>
                <Center>
                  <Box w="3em">{makeNeutralBox(props.match.items[6])}</Box>
                </Center>
                <Center>
                  <Box w="2em">
                    {makeAghBox(
                      props.match.aghanims_scepter,
                      props.match.aghanims_shard
                    )}
                  </Box>
                </Center>
                <Box paddingRight="10px" paddingLeft="10px">
                  <Text color="#ef3a1b" fontWeight="bold" textAlign="right">
                    <Link
                      href={
                        "https://www.dotabuff.com/matches/" +
                        props.match.match_id
                      }
                      passHref
                      legacyBehavior
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <Image
                          src="/dotabuff-logo.png"
                          alt="Dotabuff"
                          boxSize="1.5em"
                          display="inline-block"
                          verticalAlign="middle"
                        />
                      </a>
                    </Link>
                  </Text>
                  <Text color="#00c59e" fontWeight="bold" textAlign="right">
                    <Link
                      href={
                        "https://www.opendota.com/matches/" +
                        props.match.match_id
                      }
                      passHref
                      legacyBehavior
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <Image
                          src="/opendota-logo.png"
                          alt="OpenDota"
                          boxSize="1.5em"
                          display="inline-block"
                          verticalAlign="middle"
                        />
                      </a>
                    </Link>
                  </Text>
                </Box>
                <Center>
                  <Box w="8em">
                    <Text>
                      {" "}
                      {calculateTime(
                        props.match.start_time,
                        props.match.duration
                      )}
                    </Text>
                  </Box>
                </Center>
              </Wrap>
            </Center>
          </Flex>
        </Box>
      </MatchModal>
    );
  }
}

function makeWinnerText(bool) {
  if (bool) {
    return <Text color="green">WIN</Text>;
  } else {
    return <Text color="red">LOSS</Text>;
  }
}

function calculateTime(epoch, duration) {
  var now = new Date();
  var matchDate = new Date(epoch * 1000);
  var diffMs = now - matchDate;
  var diffMins = Math.round(diffMs / 60000 - duration / 60);
  if (diffMins < 59) {
    return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago.`;
  } else if (diffMins < 1440) {
    var hours = Math.floor(diffMins / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago.`;
  } else if (diffMins < 44639) {
    var days = Math.floor(diffMins / (60 * 24));
    return `${days} day${days > 1 ? "s" : ""} ago.`;
  } else {
    var months = Math.floor(diffMins / (60 * 24 * 31));
    return `${months} month${days > 1 ? "s" : ""} ago.`;
  }
}

function makeItemBox(item) {
  if (item.id == 0) {
    return <Box bg="radial-gradient(#333333, #1a1a1a);" w="2.3em" />;
  } else {
    return (
      <Tooltip label={item.name}>
        <Box bg="#212121">
          <Image src={item.img} alt={item.name} overflow="hidden" w="2.3em" />
        </Box>
      </Tooltip>
    );
  }
}

function makeNeutralBox(item) {
  if (item.id == 0) {
    return (
      <Box bg="radial-gradient(#8D99AE, #212121);" w="2em" borderRadius={500} />
    );
  } else {
    return (
      <Tooltip label={item.name}>
        <Box>
          <Image
            src={item.img}
            alt={item.name}
            objectFit="cover"
            overflow="hidden"
            w="2em"
            h="2em"
            borderRadius={500}
          />
        </Box>
      </Tooltip>
    );
  }
}

function makeParty(party) {
  if (party == null) {
    return <AiOutlineQuestionCircle />;
  } else if (party == 1) {
    return <BsFillPersonFill />;
  } else {
    return (
      <>
        <BsFillPersonFill /> x {party}
      </>
    );
  }
}

function makeAghBox(scepter, shard) {
  if (scepter == 0 && shard == 0) {
    return (
      <Box>
        <Image src="/scepter_0.png" />
        <Image src="/shard_0.png" />
      </Box>
    );
  } else if (scepter == 1 && shard == 0) {
    return (
      <Box>
        <Image src="/scepter_1.png" />
        <Image src="/shard_0.png" />
      </Box>
    );
  } else if (scepter == 0 && shard == 1) {
    return (
      <Box>
        <Image src="/scepter_0.png" />
        <Image src="/shard_1.png" />
      </Box>
    );
  } else {
    return (
      <Box>
        <Image src="/scepter_1.png" />
        <Image src="/shard_1.png" />
      </Box>
    );
  }
}

var ranks = [];
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
ranks["81"] = "SeasonalRankTop0.png";
ranks["99"] = "SeasonalRank0-0.png";

function calcImpact(impact) {
  if (impact > 120) {
    return "S+";
  }
  if (impact > 95) {
    return "S";
  }
  if (impact > 90) {
    return "S-";
  }
  if (impact > 85) {
    return "A+";
  }
  if (impact > 80) {
    return "A";
  }
  if (impact > 75) {
    return "A-";
  }
  if (impact > 70) {
    return "B+";
  }
  if (impact > 65) {
    return "B";
  }
  if (impact > 60) {
    return "B-";
  }
  if (impact > 55) {
    return "C+";
  }
  if (impact > 50) {
    return "C";
  }
  if (impact > 45) {
    return "C-";
  }
  if (impact > 40) {
    return "D+";
  }
  if (impact >= 35) {
    return "D";
  }
  if (impact < 35) {
    return "D-";
  } else {
    return "Error";
  }
}
