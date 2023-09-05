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
import { React, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import FeatureBox from "./FeatureBox";
import MatchModal from "../MatchModal";
import { heroMap } from "../../data/heroMap";
import Link from "next/link";

const Descending = (props) => {
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

  const [descending, setDescending] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchDescending = () => {
    fetch(`/api/feature/descending`)
      .then((res) => res.json())
      .then((data) => {
        setDescending(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDescending();
  }, []);

  if (!loaded) {
    <FeatureBox>
      <Center>
        <Spinner size="xl" color="white" />
      </Center>
    </FeatureBox>;
  } else {
    if (width < 1100) {
      return (
        <FeatureBox>
          <Heading textAlign={"center"}>Descending</Heading>
          <Stack spacing={1}>
            <Flex>
              <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                <Flex h={"3.5em"} pl={3} pr={3}>
                  <Center>
                    <Link
                      href={"/player/" + descending[0].player_id}
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
                        >
                          {descending[0].username}
                        </Heading>
                      </a>
                    </Link>
                  </Center>
                  <Spacer />
                  <Center>
                <Heading textColor={"red"}>
                      {descending[0].wins - descending[0].losses}
                    </Heading>
                  </Center>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                <Flex h={"3.5em"} pl={3} pr={3}>
                  <Center>
                    <Link
                      href={"/player/" + descending[1].player_id}
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
                        >
                          {descending[1].username}
                        </Heading>
                      </a>
                    </Link>
                  </Center>
                  <Spacer />
                  <Center>
                <Heading textColor={"red"}>
                      {descending[1].wins - descending[1].losses}
                    </Heading>
                  </Center>
                </Flex>
              </Box>
              <Box w={10} />
            </Flex>
            <Flex>
              <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                <Flex h={"3.5em"} pl={3} pr={3}>
                  <Center>
                    <Link
                      href={"/player/" + descending[2].player_id}
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
                        >
                          {descending[2].username}
                        </Heading>
                      </a>
                    </Link>
                  </Center>
                  <Spacer />
                  <Center>
                <Heading textColor={"red"}>
                      {descending[2].wins - descending[2].losses}
                    </Heading>
                  </Center>
                </Flex>
              </Box>
              <Box w={20} />
            </Flex>
          </Stack>
        </FeatureBox>
      );
    } else {
      return (
        <FeatureBox>
          <Box
            backgroundImage={"trend_down.png"}
            backgroundPosition={"center"}
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}
            padding={"0.5em"}
            h={"8em"}
          >
            <Stack>
              <Heading size={"xl"} textAlign={"center"}>
                <Link
                  href={"/player/" + descending[0].id}
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
                      size="xl"
                      padding="0.075em"
                    >
                      {descending[0].username}
                    </Heading>
                  </a>
                </Link>
              </Heading>
              <Spacer />
              <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                <Heading
                  textColor={"red"}
                  sx={{
                    textShadow: "1px 1px 5px DarkRed, 1px 1px 5px DarkRed;",
                  }}
                >
                  {descending[0].wins - descending[0].losses}
                </Heading>
                <Spacer />
                <Center>
                  <Text> Last 7 Days</Text>
                </Center>
              </Wrap>
            </Stack>
          </Box>
          <Stack spacing={"0"}>
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
              <Center>
                <Link
                  href={"/player/" + descending[1].id}
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
                      padding="0.075em"
                    >
                      {descending[1].username}
                    </Heading>
                  </a>
                </Link>
              </Center>
              <Spacer />
              <Center>
                <Heading size="md" textColor={"red"}>
                  {descending[1].wins - descending[1].losses}
                </Heading>
              </Center>
            </Wrap>
            <Box paddingLeft={"0.5em"} paddingRight={"0.5em"}>
              <Divider />
            </Box>
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
              <Center>
                <Link
                  href={"/player/" + descending[2].id}
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
                      padding="0.075em"
                    >
                      {descending[2].username}
                    </Heading>
                  </a>
                </Link>
              </Center>
              <Spacer />
              <Center>
                <Heading size="md" textColor={"red"}>
                  {descending[2].wins - descending[2].losses}
                </Heading>
              </Center>
            </Wrap>
          </Stack>
        </FeatureBox>
      );
    }
  }
};

export default Descending;
