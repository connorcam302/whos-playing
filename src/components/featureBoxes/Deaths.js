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

const Deaths = (props) => {
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
    const [deaths, setDeaths] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const fetchDeaths = () => {
        fetch(`/api/feature/most-deaths`)
            .then((res) => res.json())
            .then((data) => {
                setDeaths(data);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchDeaths();
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
                    <Heading textAlign={"center"}>Most Deaths</Heading>
                    <Stack spacing={1}>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + deaths[0].player_id}
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
                                                    {deaths[0].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"red"}>{deaths[0].deaths}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(deaths[0].hero_id).img} h={"3.5em"} />
                        </Flex>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + deaths[1].player_id}
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
                                                    {deaths[1].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"red"}>{deaths[1].deaths}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(deaths[1].hero_id).img} h={"3.5em"} />
                            <Box w={10} />
                        </Flex>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + deaths[2].player_id}
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
                                                    {deaths[2].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"red"}>{deaths[2].deaths}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(deaths[2].hero_id).img} h={"3.5em"} />
                            <Box w={20} />
                        </Flex>
                    </Stack>
                </FeatureBox>
            );
        } else {
            return (
                <FeatureBox>
                    <MatchModal matchid={deaths[0].match_id}>
                        <Box
                            backgroundImage={heroMap.get(deaths[0].hero_id).img}
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
                                        <Heading>Most Deaths</Heading>
                                    </Center>
                                    <Spacer />
                                    <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                                        <Center>
                                            <Link
                                                href={"/player/" + deaths[0].player_id}
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
                                                        {deaths[0].username}
                                                    </Heading>
                                                </a>
                                            </Link>
                                        </Center>
                                        <Spacer />
                                        <Heading textColor="red">{deaths[0].deaths}</Heading>
                                    </Wrap>
                                </Stack>
                            </Box>
                        </Box>
                    </MatchModal>
                    <Stack spacing={"0"}>
                        <MatchModal matchid={deaths[1].match_id}>
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
                                    <Image src={heroMap.get(deaths[1].hero_id).img} />
                                </Center>
                                <Center>
                                    <Link
                                        href={"/player/" + deaths[1].player_id}
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
                                                {deaths[1].username}
                                            </Heading>
                                        </a>
                                    </Link>
                                </Center>
                                <Spacer />
                                <Center>
                                    <Heading size="md" textColor={"red"}>
                                        {deaths[1].deaths}
                                    </Heading>
                                </Center>
                            </Wrap>
                        </MatchModal>
                        <Box paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                            <Divider />
                        </Box>
                        <MatchModal matchid={deaths[2].match_id}>
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
                                    <Image src={heroMap.get(deaths[2].hero_id).img} />
                                </Center>
                                <Center>
                                    <Link
                                        href={"/player/" + deaths[2].player_id}
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
                                                {deaths[2].username}
                                            </Heading>
                                        </a>
                                    </Link>
                                </Center>
                                <Spacer />
                                <Center>
                                    <Heading size="md" textColor={"red"}>
                                        {deaths[2].deaths}
                                    </Heading>
                                </Center>
                            </Wrap>
                        </MatchModal>
                    </Stack>
                </FeatureBox>
            );
        }
    }
};
export default Deaths;
