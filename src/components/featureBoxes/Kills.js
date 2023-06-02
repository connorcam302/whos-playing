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

const Kills = (props) => {
  const [kills, setKills] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchKills = () => {
    fetch(`/api/feature/most-kills`)
      .then((res) => res.json())
      .then((data) => {
        setKills(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchKills();
  }, []);

  if (!loaded) {
    <FeatureBox>
      <Center>
        <Spinner size="xl" color="white" />
      </Center>
    </FeatureBox>;
  } else {
    return (
      <MatchModal matchid={kills.match_id}>
        <FeatureBox>
          <Box
            backgroundImage={heroMap.get(kills.hero_id).img}
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
                  <Heading>Most Kills</Heading>
                </Center>
                <Spacer />
                <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                  <Center>
                    <Link
                      href={"/player/" + kills.player_id}
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
                          {kills.username}
                        </Heading>
                      </a>
                    </Link>
                  </Center>
                  <Spacer />
                  <Heading textColor={"GreenYellow"}>{kills.kills}</Heading>
                </Wrap>
              </Stack>
            </Box>
          </Box>
        </FeatureBox>
      </MatchModal>
    );
  }
};
export default Kills;
