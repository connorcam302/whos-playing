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
        if (width < 1100) {
            return (
                <FeatureBox>
                    <Heading textAlign={"center"}>Most Impact</Heading>
                    <Stack spacing={1}>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
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

                                                >
                                                    {impact[0].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"#a375f2"}>{impact[0].impact}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(impact[0].hero_id).img} h={"3.5em"} />
                        </Flex>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
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
                                                >
                                                    {impact[1].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"#a375f2"}>{impact[1].impact}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(impact[1].hero_id).img} h={"3.5em"} />
                            <Box w={10} />
                        </Flex>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
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
                                                >
                                                    {impact[2].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"#a375f2"}>{impact[2].impact}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(impact[2].hero_id).img} h={"3.5em"} />
                            <Box w={20} />
                        </Flex>
                    </Stack>
                </FeatureBox>
            );
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
                                        <Heading color={"#a375f2"} size="lg">{impact[0].impact}</Heading>
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
                                    <Heading color={"#a375f2"} size="md">{impact[1].impact}</Heading>
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
                                    <Heading color={"#a375f2"} size="md">{impact[2].impact}</Heading>
                                </Center>
                            </Wrap>
                        </MatchModal>
                    </Stack>
                </FeatureBox>
            );
        }
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
