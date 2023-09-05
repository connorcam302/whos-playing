import GetMatchHelper from "../components/GetMatchHelper";
import Statbox from "../components/Statbox";
import Feature from "../components/Feature";
import Climbing from "../components/featureBoxes/Climbing";
import Deaths from "../components/featureBoxes/Deaths";
import Descending from "../components/featureBoxes/Descending";
import GPM from "../components/featureBoxes/GPM";
import Impact from "../components/featureBoxes/Impact";
import Kills from "../components/featureBoxes/Kills";
import LowestImpact from "../components/featureBoxes/LowestImpact";
import Assists from "../components/featureBoxes/Assists";
import { Box, Center, Stack, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FilterBox from "../components/FilterBox";

export default function HomePage() {
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
        console.log("refreshing");
        setRefresh(0);
    }, [refresh]);

    if (width >= 1100) {
        return (
            <>
                <Helmet>
                    <title>Who&apos;s Playing</title>
                </Helmet>
                <Feature />
                <Center margin={5}>
                    <Wrap>
                        <Box padding={3}>
                            <FilterBox
                                heroState={setHero}
                                playerState={setPlayer}
                                refreshButton={setRefresh}
                                playerOption={true}
                            />
                            <GetMatchHelper playerid={player} heroid={hero} pageNumber="0" refresh={refresh} />
                        </Box>
                        <Box paddingTop={3}>
                            <Stack w={430}>
                                <Statbox type="player" days="14" limit="10" title="Player Stats" />
                                <Statbox type="hero" days="14" limit="10" title="Hero Stats" />
                            </Stack>
                        </Box>
                    </Wrap>
                </Center>
            </>
        );
    } else {
        return (
            <>
                <Helmet>
                    <title>Who&apos;s Playing</title>
                </Helmet>
                <Box h={"1em"} />
                <Stack>
                    <FilterBox
                        heroState={setHero}
                        playerState={setPlayer}
                        refreshButton={setRefresh}
                        playerOption={true}
                    />
                    <GetMatchHelper playerid={player} heroid={hero} pageNumber="0" card="true" refresh={refresh} />
                    <Statbox type="player" days="14" limit="5" title="Player Stats" />
                    <Statbox type="hero" days="14" limit="5" title="Hero Stats" />
                    <Stack align={"center"}>
                        <Kills />
                        <Deaths />
                        <Impact />
                        <Climbing />
                        <GPM />
                        <Assists />
                        <LowestImpact />
                        <Descending />
                    </Stack>
                </Stack>
            </>
        );
    }
}
