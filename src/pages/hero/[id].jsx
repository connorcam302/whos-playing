import { Box, Center, Flex, Heading, HStack, Image, SimpleGrid, Spinner, Stack, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);
import Statbox from "../../components/Statbox";

const HeroPage = () => {
    const router = useRouter();
    const [heroId, setHeroId] = useState()

    useEffect(() => {
        setHeroId(router.query.id)
    }, [router.query.id])

    const [allAbilities, setAllAbilities] = useState()
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/odota/dotaconstants/master/build/abilities.json')
            .then(response => {
                return response.json()
            }).then(data => {
                setAllAbilities(data)
            }).catch((e) => {
                console.log(e.message)
            })
    }, [])

    const [allHeroAbilities, setAllHeroAbilities] = useState()
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/odota/dotaconstants/master/build/hero_abilities.json')
            .then(response => {
                return response.json()
            }).then(data => {
                setAllHeroAbilities(data)
            }).catch((e) => {
                console.log(e.message)
            })
    }, [])

    const [heroes, setHeroes] = useState()
    const [heroData, setHeroData] = useState()
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/odota/dotaconstants/master/build/heroes.json')
            .then(response => {
                return response.json()
            }).then(data => {
                setHeroes(Object.values(data))
                setHeroData(Object.values(data).find((obj) => obj.name === `npc_dota_hero_${heroId}`))
            }).catch((e) => {
                console.log(e.message)
            })
    }, [heroId])

    if ([allHeroAbilities, allAbilities, heroId, heroes, heroData].every((value) => typeof value !== "undefined")) {
        console.log(allHeroAbilities["npc_dota_hero_" + heroId])
        console.log(allHeroAbilities["npc_dota_hero_" + heroId].abilities)
        let heroAbilities = []
        const blacklist = ["hidden", "empty", "telekinesis_land"];
        allHeroAbilities["npc_dota_hero_" + heroId].abilities.map((ability) => {
            if (!blacklist.some((value) => ability.includes(value))) {
                heroAbilities.push(allAbilities[ability])
            }
        })
        console.log(heroAbilities)
        let heroColour = () => {
            let colour;
            switch (heroData.primary_attr) {
                case "int":
                    colour = "#049cb4";
                    break;
                case "agi":
                    colour = "#00E400";
                    break;
                case "str":
                    colour = "#FF1F00";
                    break;
                case "all":
                    colour = "#f5cb42";
                    break;
            }
            return colour;
        }
        return (
            <Center>
                <Stack>
                    <Box h={"3em"} />
                    <Wrap justify={"center"}>
                        <Stack w={"23em"} spacing={0} bg={"#242c36"}>
                            <Center h={"3em"} bg={"#1b2129"}>
                                <Heading>{heroData.localized_name}</Heading>
                            </Center>
                            <Center>
                                <Flex pt={"0.5em"}>
                                    <Center w={"22em"} h={"22em"} mx={"auto"} background={`linear-gradient(45deg, ${heroColour()}, 10%, rgb(36, 44, 54));`} >
                                        <HeroVideo key={heroId} video={heroId} />
                                    </Center>
                                </Flex>
                            </Center>
                            <Wrap py={3} spacing="8px" align={"center"} justify={"center"}>{heroAbilities.map((ability) => {
                                return (
                                    <Image key={ability.dname} width={"3em"} height={"3em"} src={`https://cdn.cloudflare.steamstatic.com${ability.img}`} />
                                )
                            })}
                            </Wrap>
                        </Stack>
                        <Stack h={"100%"} w={"23em"} spacing={0} bg={"#242c36"}>
                            <Center h={"3em"} bg={"#1b2129"}>
                                <Heading>Notable Players</Heading>
                            </Center>
                            <Box w={"6em"}>
                                <DoughnutChart percentage={40} />
                            </Box>
                            <SimpleGrid>
                            </SimpleGrid>
                        </Stack>
                    </Wrap>
                    <Statbox height={"30em"} type="player" days="14" title="Player Stats" />
                </Stack>
            </Center >
        )
    } else {
        return (
            <Spinner size='xl' />
        )
    }
}

const HeroVideo = (props) => {
    const handleVideoError = (e) => {
        console.error("Video error:", e);
    };
    let videoUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${props.video}.webm`

    if (props.video === undefined) {
        return (
            <Spinner size='xl' />
        )
    } else {
        return (
            <Center width={"100%"} height={"100%"} overflowX={"hidden"} display={"flex"}>
                <video autoPlay muted loop playsInline onError={handleVideoError} style={{ height: "100%", objectFit: "cover" }}>
                    <source type="video/webm" src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${props.video}.webm`} style={{ width: "100%", height: "auto" }} />
                    <img src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${props.video}.png`} style={{ width: "100%", height: "auto" }} />
                </video>
            </Center>
        )
    }
}

const DoughnutChart = ({ percentage }) => {
    // Calculate the remaining percentage (100 - percentage)
    const remainingPercentage = 100 - percentage;

    // Define the chart data
    const data = {
        datasets: [
            {
                data: [percentage, remainingPercentage],
                backgroundColor: ['#36A2EB', '#242c36'], // Adjust colors as needed
            },
        ],
    };

    const options = {
        borderWidth: 0,
        cutout: 35,
    }

    const plugins = [{
        id: 'text',
        beforeDraw: function(chart, a, b) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 50).toFixed(2);
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white"

            var text = `${percentage}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    return (
        <div>
            <Doughnut data={data} options={options} plugins={plugins} />
        </div>
    );
};

export default HeroPage;
