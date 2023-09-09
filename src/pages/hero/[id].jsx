import { Box, Center, Flex, Heading, HStack, Image, Spinner, Stack, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Statbox from "../../components/Statbox";
import heroes from "../../data/heroes.json"

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

    const [allHeroes, setAllHeroes] = useState()
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/odota/dotaconstants/master/build/hero_abilities.json')
            .then(response => {
                return response.json()
            }).then(data => {
                setAllHeroes(data)
            }).catch((e) => {
                console.log(e.message)
            })
    }, [])

    if ([allHeroes, allAbilities, heroId].every((value) => typeof value !== "undefined")) {
        console.log(allHeroes["npc_dota_hero_" + heroId].abilities)
        let heroAbilities = []
        const blacklist = ["hidden", "empty", "telekinesis_land"];
        allHeroes["npc_dota_hero_" + heroId].abilities.map((ability) => {
            if (!blacklist.some((value) => ability.includes(value))) {
                heroAbilities.push(allAbilities[ability])
            }
        })
        console.log(heroAbilities)

        let heroData = heroes.find((obj) => obj.name === `npc_dota_hero_${heroId}`)
        console.log(heroData)
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
                case "uni":
                    colour = "#7636b5";
                    break;
            }
            return colour;
        }
        return (
            <Center>
                <Stack>
                    <Box h={"3em"} />
                    <Wrap>
                        <Center W={"25em"}>
                            <Stack>
                                <Box w={"20em"}>
                                <Center h={"3em"}>
                                    <Heading>{heroData.localized_name}</Heading>
                                </Center>
                                <Flex>
                                    <Center h={"20em"} w={"20em"} mx={"auto"} background={`linear-gradient(45deg, ${heroColour()}, 10%, rgb(36, 44, 54));`} >
                                        <HeroVideo key={heroId} video={heroId} />
                                    </Center>
                                </Flex>
                            </Box>
                            <Wrap spacing="8px" align={"center"} justify={"center"}>{heroAbilities.map((ability) => {
                                return (
                                    <Image key={ability.dname} width={"3em"} height={"3em"} src={`https://cdn.cloudflare.steamstatic.com${ability.img}`} />
                                )
                            })}
                            </Wrap>
                        </Stack>
                    </Center >
                    <Box h={"32em"} overflow={"auto"} css={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: "grey",
                            borderRadius: '24px',
                        },
                    }}>
                        <Statbox type="player" days="14" title="Player Stats" />
                    </Box>
                </Wrap>
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
                    Your browser does not support the video tag.
                </video>
            </Center>
        )
    }
}

export default HeroPage;
