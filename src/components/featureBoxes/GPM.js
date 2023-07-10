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
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { React, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import FeatureBox from "./FeatureBox";
import { heroMap } from "../../data/heroMap";
import MatchModal from "../MatchModal";

const GPM = (props) => {
  const [gpm, setGPM] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchGPM = () => {
    fetch(`/api/feature/highest-gpm`)
      .then((res) => res.json())
      .then((data) => {
        setGPM(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchGPM();
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
        <MatchModal matchid={gpm[0].match_id}>
          <Box
            backgroundImage={heroMap.get(gpm[0].hero_id).img}
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
                  <Heading>Highest GPM</Heading>
                </Center>
                <Spacer />
                <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                  <Center>
                    <Link
                      href={"/player/" + gpm[0].player_id}
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
                          {gpm[0].username}
                        </Heading>
                      </a>
                    </Link>
                  </Center>
                  <Spacer />
                  <Heading textColor={"GoldenRod"}>
                    {gpm[0].gold_per_min}
                  </Heading>
                </Wrap>
              </Stack>
            </Box>
          </Box>
        </MatchModal>
        <Stack spacing={"0"}>
          <MatchModal matchid={gpm[1].match_id}>
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
                <Image src={heroMap.get(gpm[1].hero_id).img} />
              </Center>
              <Center>
                <Link
                  href={"/player/" + gpm[1].player_id}
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
                      {gpm[1].username}
                    </Heading>
                  </a>
                </Link>
              </Center>
              <Spacer />
              <Center>
                <Heading size="md" textColor={"GoldenRod"}>
                  {gpm[1].gold_per_min}
                </Heading>
              </Center>
            </Wrap>
          </MatchModal>
          <Box paddingLeft={"0.5em"} paddingRight={"0.5em"}>
            <Divider />
          </Box>
          <MatchModal matchid={gpm[2].match_id}>
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
                <Image src={heroMap.get(gpm[2].hero_id).img} />
              </Center>
              <Center>
                <Link
                  href={"/player/" + gpm[2].player_id}
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
                      {gpm[2].username}
                    </Heading>
                  </a>
                </Link>
              </Center>
              <Spacer />
              <Center>
                <Heading size="md" textColor={"GoldenRod"}>
                  {gpm[2].gold_per_min}
                </Heading>
              </Center>
            </Wrap>
          </MatchModal>
        </Stack>
      </FeatureBox>
    );
  }
};

export default GPM;
