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
import { Box, Center, Stack, Text, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FilterBox from "../components/FilterBox";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export default function HomePage() {
    SwiperCore.use([Autoplay]);

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
                            <GetMatchHelper
                                playerid={player}
                                heroid={hero}
                                pageNumber="0"
                                refresh={refresh}
                            />
                        </Box>
                        <Box paddingTop={3}>
                            <Stack w={430}>
                                <Statbox type="player" days="14" title="Player Stats" height={"38.5em"} />
                                <Statbox type="hero" days="14" title="Hero Stats" height={"38.5em"} />
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
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
                >
                    <SwiperSlide>
                        <Impact />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Kills />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Deaths />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Assists />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Climbing />
                    </SwiperSlide>
                    <SwiperSlide>
                        <GPM />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LowestImpact />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Descending />
                    </SwiperSlide>
                </Swiper>
                <Box h={3} />
                <Stack>
                    <FilterBox
                        heroState={setHero}
                        playerState={setPlayer}
                        refreshButton={setRefresh}
                        playerOption={true}
                    />
                    <GetMatchHelper
                        playerid={player}
                        heroid={hero}
                        pageNumber="0"
                        card="true"
                        refresh={refresh}
                    />
                    <Statbox height={"16em"} type="player" days="14" title="Player Stats" />
                    <Statbox height={"16em"} type="hero" days="14" title="Hero Stats" />
                </Stack>
            </>
        );
    }
}
