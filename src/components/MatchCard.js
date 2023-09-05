import {
    Box,
    Center,
    Divider,
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Stack,
    Text,
    Tooltip,
    Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function MatchCard(props) {
    return (
        <Flex
            w={"100vw"}
            bg={
                props.match.winner == true
                    ? "linear-gradient(to left, #242c36, #242c36, #2f4c39,#2f4c39)"
                    : "linear-gradient(to left, #242c36, #242c36, #AA4344,#AA4344)"
            }
        >
            <Image
                height="2.8em"
                src={props.match.hero.img}
                alt={props.match.hero.name}
                sx={{ margin: 0 }}
            />
            <Flex w={"100%"} paddingLeft={1}>
                <Center>
                    <Link
                        href={"/player/" + props.match.player_id}
                        passHref
                        legacyBehavior
                    >
                        <a rel="noopener noreferrer">
                            <Flex w="5em">
                                <Center>
                                    <Stack spacing={0}>
                                        <Heading size="sm" textAlign={"left"}>
                                            {props.match.username}
                                        </Heading>
                                        <Text fontSize={10} color={'#cccccc'}>{calculateTime(props.match.start_time, props.match.duration)}
                                        </Text>
                                    </Stack>
                                </Center>
                                <Spacer />
                            </Flex>
                        </a>
                    </Link>
                </Center>
                <Center w={"2em"}>
                    <Tooltip label={"Impact Score: " + props.match.impact}>
                        <Center>
                            <Heading
                                color={
                                    {
                                        "S+": "gold",
                                        "F-": "#B7791F",
                                    }[calcImpact(props.match.impact)] || "#ffffff"
                                }
                                size="sm"
                                sx={{
                                    textShadow:
                                        {
                                            "S+": "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                                            "F-": "1px 1px 12px #B7791F, 1px 1px 12px #B7791F;",
                                        }[calcImpact(props.match.impact)] || "",
                                }}
                                textAlign={"center"}
                            >
                                {calcImpact(props.match.impact)}
                            </Heading>
                        </Center>
                    </Tooltip>
                </Center>
                <Spacer />
                <Center>
                    <Stack spacing={"0"}>
                        <Center>
                            <HStack spacing={0}>
                                <Text textAlign="center" fontSize="xs" fontWeight="bold">
                                    {props.match.kills}
                                </Text>
                                <Text textAlign="center" fontSize="xs" fontWeight="bold" >
                                    /
                                </Text>
                                <Text textAlign="center" fontSize="xs" fontWeight="bold">
                                    {props.match.deaths}
                                </Text>
                                <Text textAlign="center" fontSize="xs" fontWeight="bold" >
                                    /
                                </Text>
                                <Text textAlign="center" fontSize="xs" fontWeight="bold">
                                    {props.match.assists}
                                </Text>
                            </HStack>
                        </Center>
                        <Center>
                            <Text textAlign="center" fontSize="xs">
                                {Math.floor(props.match.duration / 60)}:
                                {Math.round(props.match.duration % 60) > 10
                                    ? Math.round(props.match.duration % 60)
                                    : "0" + Math.round(props.match.duration % 60)}
                            </Text>
                        </Center>
                    </Stack>
                </Center>
                <Spacer />
                <Box bg="#212121">
                    <Box>
                        <Wrap spacing="0px">
                            {makeItemBox(props.match.items[0])}
                            {makeItemBox(props.match.items[1])}
                            {makeItemBox(props.match.items[2])}
                        </Wrap>
                    </Box>
                    <Box>
                        <Wrap spacing="0px">
                            {makeItemBox(props.match.items[3])}
                            {makeItemBox(props.match.items[4])}
                            {makeItemBox(props.match.items[5])}
                        </Wrap>
                    </Box>
                </Box>
                <Stack spacing={'0.2'} w={"2em"}>
                    <Center>
                        <Box>{makeNeutralBox(props.match.items[6])}</Box>
                    </Center>
                    <Center>
                        <Box>
                            {makeAghBox(
                                props.match.aghanims_scepter,
                                props.match.aghanims_shard
                            )}
                        </Box>
                    </Center>
                </Stack>
            </Flex>
            <Spacer />

        </Flex>
    );
}

function makeWinnerText(bool) {
    if (bool) {
        return <Text color="green">WIN</Text>;
    } else {
        return <Text color="red">LOSS</Text>;
    }
}

function calculateTime(epoch, duration) {
    var now = new Date();
    var matchDate = new Date(epoch * 1000);
    var diffMs = now - matchDate;
    var diffMins = Math.round(diffMs / 60000 - duration / 60);
    if (diffMins < 59) {
        return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago.`;
    } else if (diffMins < 1440) {
        var hours = Math.floor(diffMins / 60);
        return `${hours} hour${hours > 1 ? "s" : ""} ago.`;
    } else if (diffMins < 44639) {
        var days = Math.floor(diffMins / (60 * 24));
        return `${days} day${days > 1 ? "s" : ""} ago.`;
    } else {
        var months = Math.floor(diffMins / (60 * 24 * 31));
        return `${months} month${days > 1 ? "s" : ""} ago.`;
    }
}

function makeItemBox(item) {
    if (item.img === null) {
        return <Box bg="radial-gradient(#333333, #1a1a1a);" w="1.9em" />;
    } else {
        return (
            <Tooltip label={item.name}>
                <Box bg="#212121" w="1.9em">
                    <Image objectFit={"cover"} src={item.img} alt={item.name} w={"100%"} h={"100%"} />
                </Box>
            </Tooltip>
        );
    }
}

function makeAghBox(scepter, shard) {
    if (scepter == 0 && shard == 0) {
        return (
            <Box w="1em">
                <Image src="/scepter_0.png" />
                <Image src="/shard_0.png" />
            </Box>
        );
    } else if (scepter == 1 && shard == 0) {
        return (
            <Box w="1em">
                <Image src="/scepter_1.png" />
                <Image src="/shard_0.png" />
            </Box>
        );
    } else if (scepter == 0 && shard == 1) {
        return (
            <Box w="1em">
                <Image src="/scepter_0.png" />
                <Image src="/shard_1.png" />
            </Box>
        );
    } else {
        return (
            <Box w="1em">
                <Image src="/scepter_1.png" />
                <Image src="/shard_1.png" />
            </Box>
        );
    }
}

function makeNeutralBox(item) {
    if (item.id == 0) {
        return (
            <Box bg="radial-gradient(#8D99AE, #212121);" w="1em" h="1em" borderRadius={500} />
        );
    } else {
        return (
            <Tooltip label={item.name}>
                <Box>
                    <Image
                        src={item.img}
                        alt={item.name}
                        objectFit="cover"
                        overflow="hidden"
                        w="1em"
                        h="1em"
                        borderRadius={500}
                    />
                </Box>
            </Tooltip>
        );
    }
}

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
    if (impact > 35) {
        return "D";
    }
    if (impact > 35) {
        return "D-";
    }
    if (impact > 30) {
        return "F+";
    }
    if (impact >= 20) {
        return "F";
    }
    if (impact < 20) {
        return "F-";
    } else {
        return "Error";
    }
}
