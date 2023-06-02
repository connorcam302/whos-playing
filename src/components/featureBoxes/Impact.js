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
      <MatchModal matchid={impact.match_id}>
        <FeatureBox>
          <Box
            backgroundImage={heroMap.get(impact.hero_id).img}
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
                      href={"/player/" + impact.player_id}
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
                          {impact.username}
                        </Heading>
                      </a>
                    </Link>
                  </Center>
                  <Spacer />
                  <Heading
                    color={
                      calcImpact(impact.impact) == "S+" ? "gold" : "#ffffff"
                    }
                    size="xl"
                    sx={
                      calcImpact(impact.impact) == "S+"
                        ? {
                            textShadow: "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                          }
                        : ""
                    }
                    padding="0.12em"
                  >
                    {calcImpact(impact.impact)}
                  </Heading>
                </Wrap>
              </Stack>
            </Box>
          </Box>
        </FeatureBox>
      </MatchModal>
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
  } else {
    return "Error";
  }
}
