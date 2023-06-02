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
import { React, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import FeatureBox from "./FeatureBox";

const Descending = (props) => {
  const [descending, setDescending] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchDescending = () => {
    fetch(`/api/feature/descending`)
      .then((res) => res.json())
      .then((data) => {
        setDescending(data);
        setLoaded(true)
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
          backgroundImage={"trend_down.png"}
          backgroundPosition={"center"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          padding={"0.5em"}
          h={"8em"}
        >
          <Stack>
            <Heading size={"xl"} textAlign={"center"}>
              {descending.username}
            </Heading>
            <Spacer />
            <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
              <Heading
                textColor={"red"}
                sx={{ textShadow: "1px 1px 5px DarkRed, 1px 1px 5px DarkRed;" }}
              >
                {descending.wins - descending.losses}
              </Heading>
              <Spacer />
              <Center>
                <Text> Last 7 Days</Text>
              </Center>
            </Wrap>
          </Stack>
        </Box>
      </FeatureBox>
    );
  }
};

export default Descending;
