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
import Head from "next/head";

const Assists = (props) => {
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

    const [assists, setAssists] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const fetchAssists = () => {
        fetch(`/api/feature/most-assists`)
            .then((res) => res.json())
            .then((data) => {
                setAssists(data);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchAssists();
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
                    <Heading textAlign={'center'}>Most Assists</Heading>
                    <Stack spacing={1}>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + assists[0].player_id}
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
                                                    {assists[0].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"teal.200"}>{assists[0].assists}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(assists[0].hero_id).img} h={"3.5em"} />
                        </Flex >
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + assists[1].player_id}
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
                                                    {assists[1].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"teal.200"}>{assists[1].assists}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(assists[1].hero_id).img} h={"3.5em"} />
                            <Box w={10} />
                        </Flex>
                        <Flex>
                            <Box h={"3.5em"} w={"100%"} bg={"#242C36"}>
                                <Flex h={"3.5em"} pl={3} pr={3}>
                                    <Center>
                                        <Link
                                            href={"/player/" + assists[2].player_id}
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
                                                    {assists[2].username}
                                                </Heading>
                                            </a>
                                        </Link>
                                    </Center>
                                    <Spacer />
                                    <Center>
                                        <Heading color={"teal.200"}>{assists[2].assists}</Heading>
                                    </Center>
                                </Flex>
                            </Box>
                            <Image src={heroMap.get(assists[2].hero_id).img} h={"3.5em"} />
                            <Box w={20} />
                        </Flex>
                    </Stack >
                </FeatureBox >
            )
        } else {
            return (
                <FeatureBox>
                    <MatchModal matchid={assists[0].match_id}>
                        <Box
                            backgroundImage={heroMap.get(assists[0].hero_id).img}
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
                                        <Heading>Most Assists</Heading>
                                    </Center>
                                    <Spacer />
                                    <Wrap paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                                        <Center>
                                            <Link
                                                href={"/player/" + assists[0].player_id}
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
                                                        {assists[0].username}
                                                    </Heading>
                                                </a>
                                            </Link>
                                        </Center>
                                        <Spacer />
                                        <Heading textColor={"teal.200"}>{assists[0].assists}</Heading>
                                    </Wrap>
                                </Stack>
                            </Box>
                        </Box>
                    </MatchModal>
                    <Stack spacing={"0"}>
                        <MatchModal matchid={assists[1].match_id}>
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
                                    <Image src={heroMap.get(assists[1].hero_id).img} />
                                </Center>
                                <Center>
                                    <Link
                                        href={"/player/" + assists[1].player_id}
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
                                                {assists[1].username}
                                            </Heading>
                                        </a>
                                    </Link>
                                </Center>
                                <Spacer />
                                <Center>
                                    <Heading size="md" textColor={"teal.200"}>
                                        {assists[1].assists}
                                    </Heading>
                                </Center>
                            </Wrap>
                        </MatchModal>
                        <Box paddingLeft={"0.5em"} paddingRight={"0.5em"}>
                            <Divider />
                        </Box>
                        <MatchModal matchid={assists[2].match_id}>
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
                                    <Image src={heroMap.get(assists[2].hero_id).img} />
                                </Center>
                                <Center>
                                    <Link
                                        href={"/player/" + assists[2].player_id}
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
                                                {assists[2].username}
                                            </Heading>
                                        </a>
                                    </Link>
                                </Center>
                                <Spacer />
                                <Center>
                                    <Heading size="md" textColor={"teal.200"}>
                                        {assists[2].assists}
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
export default Assists;

