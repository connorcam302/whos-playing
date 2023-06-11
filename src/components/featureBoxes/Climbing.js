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
import Link from "next/link";

const Climbing = (props) => {
  const [climbing, setClimbing] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchDescending = () => {
    fetch(`/api/feature/climbing`)
      .then((res) => res.json())
      .then((data) => {
        setClimbing(data);
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
    return (
      <FeatureBox>
        <Box
          backgroundImage={"trend_up.png"}
          backgroundPosition={"center"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          padding={"0.5em"}
          h={"8em"}
        >
          <Stack>
            <Heading size={"xl"} textAlign={"center"}>
            <Link
                href={"/player/" + climbing[0].id}
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
                    {climbing[0].username}
                  </Heading>
                </a>
              </Link>
            </Heading>
            <Spacer />
            <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
              <Heading
                textColor={"Chartreuse"}
                sx={{ textShadow: "1px 1px 5px Chartreuse, 1px 1px 5px Chartreuse;" }}
              >
                +{climbing[0].wins - climbing[0].losses}
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
                href={"/player/" + climbing[1].id}
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
                    {climbing[1].username}
                  </Heading>
                </a>
              </Link>
            </Center>
            <Spacer />
            <Center>
              <Heading size="md" textColor={"Chartreuse"}>
                +{climbing[1].wins - climbing[1].losses}
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
                href={"/player/" + climbing[2].id}
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
                    {climbing[2].username}
                  </Heading>
                </a>
              </Link>
            </Center>
            <Spacer />
            <Center>
              <Heading size="md" textColor={"Chartreuse"}>
                +{climbing[2].wins - climbing[2].losses}
              </Heading>
            </Center>
          </Wrap>
        </Stack>
      </FeatureBox>
    );
  }
};
export default Climbing;
