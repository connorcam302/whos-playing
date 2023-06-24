import {
  Button,
  Center,
  Select,
  Stack,
  Text,
  Image,
  Box,
  Flex,
  Heading,
  Wrap,
  Spacer,
  Spinner,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { React, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import FeatureBox from "./FeatureBox";
import { heroMap } from "../../data/heroMap";
import MatchModal from "../MatchModal";

const Impact = (props) => {
  const [impact, setImpact] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchImpact = () => {
    fetch(`/api/feature/highest-impact`)
      .then((res) => res.json())
      .then((data) => {
        setImpact(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchImpact();
  }, []);

  if (!loaded) {
    <FeatureBox>
      <Center>
        <Spinner size="xl" color="white" />
      </Center>
    </FeatureBox>;
  } else {
    return (
      
        <FeatureBox>
          <MatchModal matchid={impact[0].match_id}>
          <Box
            backgroundImage={heroMap.get(impact[0].hero_id).img}
            backgroundPosition={"center"}
            backgroundSize={"100%"}
            backgroundRepeat={"no-repeat"}
            sx={{ cursor: "pointer" }}
            h={"8em"}
          >
            <Box
              backgroundColor={"rgba(0,0,0,0.55)"}
              padding={"0.5em"}
              _hover={{
                backgroundColor: "rgba(0,0,0,0.7)",
                transition: "0.3s",
              }}
              h={"100%"}
            >
              <Stack>
                <Center>
                  <Heading>Most Impact</Heading>
                </Center>
                <Spacer />
                <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                  <Center>
                    <Link
                      href={"/player/" + impact[0].player_id}
                      passHref
                      legacyBehavior
                    >
                      <a rel="noopener noreferrer">
                        <Heading
                          _hover={{
                            color: "#808080",
                            transition: "0.3s",
                            textDecoration: "none",
                          }}
                          size="lg"
                        >
                          {impact[0].username}
                        </Heading>
                      </a>
                    </Link>
                  </Center>
                  <Spacer />
                  <Tooltip label={"Impact Score: " + impact[0].impact}>
                    <Heading
                      color={
                        calcImpact(impact[0].impact) == "S+"
                          ? "gold"
                          : "#ffffff"
                      }
                      size="xl"
                      sx={
                        calcImpact(impact[0].impact) == "S+"
                          ? {
                              textShadow:
                                "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                            }
                          : ""
                      }
                      padding="0.12em"
                    >
                      {calcImpact(impact[0].impact)}
                    </Heading>
                  </Tooltip>
                </Wrap>
              </Stack>
            </Box>
          </Box>
          </MatchModal>
          <Stack spacing={"0"}>
            <MatchModal matchid={impact[1].match_id}>
              <Wrap
                padding={"0.5em"}
                paddingLeft={"1em"}
                paddingRight={"1em"}
                _hover={{
                  backgroundColor: "#0c0f12",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                <Center w={"3em"}>
                  <Image src={heroMap.get(impact[1].hero_id).img} />
                </Center>
                <Center>
                  <Link
                    href={"/player/" + impact[1].player_id}
                    passHref
                    legacyBehavior
                  >
                    <a rel="noopener noreferrer">
                      <Heading
                        _hover={{
                          color: "#808080",
                          transition: "0.3s",
                          textDecoration: "none",
                        }}
                        size="md"
                      >
                        {impact[1].username}
                      </Heading>
                    </a>
                  </Link>
                </Center>
                <Spacer />
                <Center>
                  <Tooltip label={"Impact Score: " + impact[1].impact}>
                    <Heading
                      color={
                        calcImpact(impact[1].impact) == "S+"
                          ? "gold"
                          : "#ffffff"
                      }
                      size="md"
                      sx={
                        calcImpact(impact[1].impact) == "S+"
                          ? {
                              textShadow:
                                "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                            }
                          : ""
                      }
                    >
                      {calcImpact(impact[1].impact)}
                    </Heading>
                  </Tooltip>
                </Center>
              </Wrap>
            </MatchModal>
            <Box paddingLeft={"0.5em"} paddingRight={"0.5em"}>
              <Divider />
            </Box>
            <MatchModal matchid={impact[2].match_id}>
              <Wrap
                padding={"0.5em"}
                paddingLeft={"1em"}
                paddingRight={"1em"}
                _hover={{
                  backgroundColor: "#0c0f12",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                <Center w={"3em"}>
                  <Image src={heroMap.get(impact[2].hero_id).img} />
                </Center>
                <Center>
                  <Link
                    href={"/player/" + impact[2].player_id}
                    passHref
                    legacyBehavior
                  >
                    <a rel="noopener noreferrer">
                      <Heading
                        _hover={{
                          color: "#808080",
                          transition: "0.3s",
                          textDecoration: "none",
                        }}
                        size="md"
                      >
                        {impact[2].username}
                      </Heading>
                    </a>
                  </Link>
                </Center>
                <Spacer />
                <Center>
                  <Tooltip label={"Impact Score: " + impact[2].impact}>
                    <Heading
                      color={
                        calcImpact(impact[2].impact) == "S+"
                          ? "gold"
                          : "#ffffff"
                      }
                      size="md"
                      sx={
                        calcImpact(impact[2].impact) == "S+"
                          ? {
                              textShadow:
                                "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                            }
                          : ""
                      }
                    >
                      {calcImpact(impact[2].impact)}
                    </Heading>
                  </Tooltip>
                </Center>
              </Wrap>
            </MatchModal>
          </Stack>
        </FeatureBox>
    );
  }
};

export default Impact;

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
  }
  if (impact >= 30) {
    return "F+";
  }
  if (impact >= 25) {
    return "F";
  }
  if (impact >= 20) {
    return "F-";
  } else {
    return "Error";
  }
}
