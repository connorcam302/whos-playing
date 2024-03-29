import GetMatchHelper from "../../components/GetMatchHelper";
import PageButtons from "../../components/PageButtons";
import { PlayerWinChart } from "../../components/PlayerWinChart";
import Statbox from "../../components/Statbox";
import FilterBox from "../../components/FilterBox";
import {
    Box,
    Center,
    Heading,
    Spacer,
    Spinner,
    Stack,
    Text,
    Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function PlayerPage() {
    const router = useRouter();

    const [playerData, setPlayerData] = useState([]);
    const [playerLoaded, setPlayerLoaded] = useState(false);
    const fetchPlayerData = () => {
        fetch(`/api/player/${router.query.id}`)
            .then((res) => res.json())
            .then((playerDataRes) => {
                setPlayerData(playerDataRes[0]);
                setPlayerLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [statData, setStatData] = useState([]);
    const [statLoaded, setStatLoaded] = useState(false);
    const fetchStatData = () => {
        fetch(`/api/stats/player/${router.query.id}`)
            .then((res) => res.json())
            .then((statDataRes) => {
                setStatData(statDataRes);
                setStatLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            fetchPlayerData();
        }
    }, [router.isReady]);

    useEffect(() => {
        if (router.isReady) {
            fetchStatData();
        }
    }, [router.isReady]);

    const [page, setPage] = useState(0);
    console.log(page);

    const increasePage = () => {
        setPage(page + 1);
    };
    const decreasePage = () => {
        if (!page == 0) {
            setPage(page - 1);
        }
    };

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

    const [hero, setHero] = useState("all");
    const [player, setPlayer] = useState("all");
    const [refresh, setRefresh] = useState("all");

    useEffect(() => {
        setRefresh(0);
    }, [refresh]);

    useEffect(() => {
        console.log(page);
    }, [page]);

    if (!playerLoaded || !statLoaded) {
        return (
            <>
                <Helmet>
                    <title>Who&apos;s Playing</title>
                </Helmet>
                <Center margin={5}>
                    <Wrap>
                        <Spinner color="white" size="xl" />;
                    </Wrap>
                </Center>
            </>
        );
    }
    if (playerLoaded && statLoaded) {
        if (playerData === undefined) {
            return (
                <>
                    <Helmet>
                        <title>Not Found</title>
                    </Helmet>
                    <Center padding={5} paddingTop={300}>
                        <Heading>Player {router.query.id} not found.</Heading>
                    </Center>
                </>
            );
        } else if (width >= 1100) {
            return (
                <>
                    <Helmet>
                        <title>{playerData.username}</title>
                    </Helmet>
                    <Center margin={10}>
                        <Wrap>
                            <Stack>
                                <Wrap w="36em" bg="#242c36" padding="15px">
                                    <Box>
                                        <Heading margin="4px">{playerData.username}</Heading>
                                    </Box>
                                    <Spacer />
                                    <Center>
                                        <Heading color="green.400">{statData.wins}</Heading>
                                        <Heading>-</Heading>
                                        <Heading color="red.500">{statData.losses}</Heading>
                                    </Center>
                                </Wrap>
                                <Stack w="36em" bg="#242c36" padding="15px" h="100%">
                                    <Spacer />
                                    <Center>
                                        <Text>Last 14 Days</Text>
                                    </Center>
                                    <PlayerWinChart id={router.query.id} h="100%" />
                                    <Spacer />
                                </Stack>
                            </Stack>
                            <Statbox
                                type="hero"
                                days="31"
                                limit="8"
                                title="Hero Stats"
                                player={router.query.id}
                                height={"30em"}
                            />
                        </Wrap>
                    </Center>
                    <Center>
                        <Stack>
                            <FilterBox
                                heroState={setHero}
                                playerState={setPlayer}
                                refreshButton={setRefresh}
                                playerOption={false}
                            />
                            <GetMatchHelper
                                key={page}
                                playerid={router.query.id}
                                heroid={hero}
                                pageNumber={page}
                            />
                            <PageButtons increase={increasePage} decrease={decreasePage} pageNumber={page} />
                        </Stack>
                    </Center>
                </>
            );
        } else {
            return (
                <>
                    <Helmet>
                        <title>{playerData.username}</title>
                    </Helmet>
                    <Center>
                        <Wrap justify="center" marginTop={2}>
                            <Wrap w="22.5em" bg="#242c36" padding="15px">
                                <Box>
                                    <Heading margin="4px">{playerData.username}</Heading>
                                </Box>
                                <Spacer />
                                <Center>
                                    <Heading color="green.400">{statData.wins}</Heading>
                                    <Heading>-</Heading>
                                    <Heading color="red.500">{statData.losses}</Heading>
                                </Center>
                            </Wrap>
                            <Stack w="22.5em" bg="#242c36" padding="15px" h="100%">
                                <Spacer />
                                <Center>
                                    <Text>Last 14 Days</Text>
                                </Center>
                                <PlayerWinChart id={router.query.id} h="100%" />
                                <Spacer />
                            </Stack>
                            <Box w="22.5em">
                                <Statbox
                                    type="hero"
                                    days="31"
                                    limit="8"
                                    title="Hero Stats"
                                    player={router.query.id}
                                    height={"16em"}
                                />
                            </Box>
                        </Wrap>
                    </Center>
                    <Box h={"0.5em"} />
                    <Stack>
                        <FilterBox
                            heroState={setHero}
                            playerState={setPlayer}
                            refreshButton={setRefresh}
                            playerOption={true}
                        />
                        <GetMatchHelper
                            key={page}
                            playerid={router.query.id}
                            heroid={hero}
                            pageNumber={page}
                            card="true"
                        />
                        <PageButtons increase={increasePage} decrease={decreasePage} pageNumber={page} />
                    </Stack>
                </>
            );
        }
    }
}
