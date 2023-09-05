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

const Kills = (props) => {
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
        if (width < 1100) {
            return (
                <FeatureBox>
                    <Heading textAlign={"center"}>Most Kills</Heading>
                    <Stack spacing={1}>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + kills[0].player_id}
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
                                                    {kills[0].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"GreenYellow"}>{kills[0].kills}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(kills[0].hero_id).img} h={"3.5em"} />
                        </Flex>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + kills[1].player_id}
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
                                                    {kills[1].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"GreenYellow"}>{kills[1].kills}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(kills[1].hero_id).img} h={"3.5em"} />
                            <Box w={10} />
                        </Flex>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + kills[2].player_id}
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
                                                    {kills[2].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"GreenYellow"}>{kills[2].kills}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(kills[2].hero_id).img} h={"3.5em"} />
                            <Box w={20} />
                        </Flex>
                    </Stack>
                </FeatureBox>
            );
        } else {
            return (
                <FeatureBox>
                    <MatchModal matchid={kills[0].match_id}>
                        <Box
                            backgroundImage={heroMap.get(kills[0].hero_id).img}
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
                                                href={"/player/" + kills[0].player_id}
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
                                                        {kills[0].username}
                                                    </Heading>
                                                </a>
                                            </Link>
                                        </Center>
                                        <Spacer />
                                        <Heading textColor={"GreenYellow"}>{kills[0].kills}</Heading>
                                    </Wrap>
                                </Stack>
                            </Box>
                        </Box>
                    </MatchModal>
                    <Stack spacing={"0"}>
                        <MatchModal matchid={kills[1].match_id}>
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
                                    <Image src={heroMap.get(kills[1].hero_id).img} />
                                </Center>
                                <Center>
                                    <Link
                                        href={"/player/" + kills[1].player_id}
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
                                                {kills[1].username}
                                            </Heading>
                                        </a>
                                    </Link>
                                </Center>
                                <Spacer />
                                <Center>
                                    <Heading size="md" textColor={"GreenYellow"}>
                                        {kills[1].kills}
                                    </Heading>
                                </Center>
                            </Wrap>
                        </MatchModal>
                        <Box paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                            <Divider />
                        </Box>
                        <MatchModal matchid={kills[2].match_id}>
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
                                    <Image src={heroMap.get(kills[2].hero_id).img} />
                                </Center>
                                <Center>
                                    <Link
                                        href={"/player/" + kills[2].player_id}
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
                                                {kills[2].username}
                                            </Heading>
                                        </a>
                                    </Link>
                                </Center>
                                <Spacer />
                                <Center>
                                    <Heading size="md" textColor={"GreenYellow"}>
                                        {kills[2].kills}
                                    </Heading>
                                </Center>
                            </Wrap>
                        </MatchModal>
                    </Stack>
                </FeatureBox>
            );
        }
    };
}

export default Kills;
