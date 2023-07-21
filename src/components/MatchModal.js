const {
    ModalFooter,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box,
    Spinner,
    Center,
    Text,
    Wrap,
    Spacer,
    Heading,
    Tab,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Image,
    Link,
    Tooltip,
    Stack,
    Divider,
} = require("@chakra-ui/react");
const React = require("react");
const { useEffect, useState } = require("react");
import { RiVipCrownFill } from "react-icons/ri";

function MatchModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const fetchData = () => {
        if (!loaded) {
            fetch(`/api/matches/${props.matchid}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const playerName = (player) => {
        if (player.name == "Anonymous") {
            return (
                <Text
                    color={
                        player.name == "Anonymous"
                            ? "gray"
                            : "white"
                    }
                >
                    {player.name}
                </Text>

            )
        } else if (player.name.includes("🎣")) {
            return (
                <Text
                    color={
                        "#4299E1"
                    }
                >
                    {player.name}
                </Text>
            )
        } else {
            return (<Link href={"/player/" + player.account_id}>
                <a
                    rel="noopener noreferrer"
                    passHref
                    legacyBehavior
                >
                    <Text
                        fontSize="md"
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                        }}
                        h="100%"
                        _hover={{
                            color: "#808080",
                            transition: "0.3s",
                        }}
                    >
                        {player.name}
                    </Text>
                </a>
            </Link>
            )
        }
    }


    if (!isOpen) {
        return (
            <>
                <Box onClick={onOpen}>{props.children}</Box>

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody></ModalBody>
                    </ModalContent>
                </Modal>
            </>
        );
    } else if (!loaded) {
        return (
            <>
                <Box onClick={onOpen}>{props.children}</Box>

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#1b2129">
                        <ModalBody>
                            <Center>
                                <Spinner color="white" size={"xl"} />
                            </Center>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        );
    }
    if (loaded) {
        console.log(data);
        return (
            <>
                <Box onClick={onOpen}>{props.children}</Box>

                <Modal onClose={onClose} isOpen={isOpen} isCentered size="20em">
                    <ModalOverlay />
                    <ModalContent bg="#1b2129" maxW="100em">
                        <ModalBody marginTop={2} marginBottom={2}>
                            <Wrap spacing={5}>
                                <Spacer />
                                <Center>
                                    <Heading
                                        color="green.400"
                                        sx={{
                                            textShadow:
                                                data.radiant_win == true
                                                    ? "1px 1px 15px #48BB78, 1px 1px 15px #48BB78;"
                                                    : "",
                                        }}
                                    >
                                        {data.radiant_score}
                                    </Heading>
                                </Center>
                                <Box>
                                    <Heading textAlign={"center"}>
                                        {Math.floor(data.duration / 60)}:
                                        {Math.round(data.duration % 60) >= 10
                                            ? Math.round(data.duration % 60)
                                            : "0" + Math.round(data.duration % 60)}
                                    </Heading>
                                    <Text textAlign={"center"}>
                                        {calculateTime(data.start_time, data.duration)}
                                    </Text>
                                </Box>
                                <Center>
                                    <Heading
                                        color="red.500"
                                        sx={{
                                            textShadow:
                                                data.radiant_win == false
                                                    ? "1px 1px 15px #E53E3E, 1px 1px 15px #E53E3E;"
                                                    : "",
                                        }}
                                    >
                                        {data.dire_score}
                                    </Heading>
                                </Center>
                                <Spacer />
                            </Wrap>
                            <Wrap marginTop={3}>
                                <Heading size={"md"}>Radiant</Heading>
                                <Center>
                                    {data.radiant_win == true ? (
                                        <RiVipCrownFill color="white" />
                                    ) : (
                                        ""
                                    )}
                                </Center>
                            </Wrap>
                            <TableContainer>
                                <Table
                                    variant="simple"
                                    colorScheme="whiteAlpha"
                                    textAlign={"center"}
                                >
                                    <Thead>
                                        <Th w="120px">
                                            <Center>Player</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>Level</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>K</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>D</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>A</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>IMP</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>CS</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>NET</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>GPM</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>XPM</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>HD</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>TD</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>HH</Center>
                                        </Th>
                                        <Th w="250px">
                                            <Center>Items</Center>
                                        </Th>
                                    </Thead>
                                    <Tbody>
                                        {data.players.map((player) => {
                                            if (player.team_number == 0)
                                                return (
                                                    <Tr
                                                        key={player.account_id}
                                                        _hover={{
                                                            backgroundColor: "#242c36",
                                                            transition: "0.3s",
                                                        }}
                                                    >
                                                        <Td padding="2px">
                                                            <Wrap>
                                                                <Image
                                                                    src={player.hero_img}
                                                                    alt={player.hero_name}
                                                                    w="3em"
                                                                />
                                                                <Center>
                                                                    {playerName(player)}
                                                                </Center>
                                                            </Wrap>
                                                            <Spacer />
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>{player.level}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="green.300">{player.kills}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="red.400">{player.deaths}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="teal.200">{player.assists}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Tooltip
                                                                    label={"Impact Score: " + calcImpactNum(player, data.duration)}
                                                                >
                                                                    <Text
                                                                        color={
                                                                            {
                                                                                "S+": "gold",
                                                                                "F-": "#B7791F",
                                                                            }[calcImpact(
                                                                                calcImpactNum(player, data.duration)
                                                                            )] ||
                                                                            "#ffffff"
                                                                        }
                                                                        size="md"
                                                                        sx={{
                                                                            textShadow:
                                                                                {
                                                                                    "S+": "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                                                                                    "F-": "1px 1px 12px #B7791F, 1px 1px 12px #B7791F;",
                                                                                }[calcImpact(
                                                                                    calcImpactNum(player, data.duration)
                                                                                )] || "",
                                                                        }}
                                                                    >
                                                                        {calcImpact(
                                                                            calcImpactNum(player, data.duration)
                                                                        )}
                                                                    </Text>
                                                                </Tooltip>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {player.last_hits} / {player.denies}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="yellow.400">
                                                                    {convertToKNumber(player.net_worth)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>{player.gold_per_min}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>{player.xp_per_min}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {convertToKNumber(player.hero_damage)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {convertToKNumber(player.tower_damage)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {convertToKNumber(player.hero_healing)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Stack direction="row" spacing={4}>
                                                                <Center>
                                                                    <Wrap spacing={0}>
                                                                        {makeItemBox(player.items[0])}
                                                                        {makeItemBox(player.items[1])}
                                                                        {makeItemBox(player.items[2])}
                                                                        {makeItemBox(player.items[3])}
                                                                        {makeItemBox(player.items[4])}
                                                                        {makeItemBox(player.items[5])}
                                                                    </Wrap>
                                                                </Center>
                                                                <Center>
                                                                    <Box>{makeNeutralBox(player.items[6])}</Box>
                                                                </Center>
                                                                <Center>
                                                                    <Box w={7}>
                                                                        {makeAghBox(
                                                                            player.aghanims_scepter,
                                                                            player.aghanims_shard
                                                                        )}
                                                                    </Box>
                                                                </Center>
                                                            </Stack>
                                                        </Td>
                                                    </Tr>
                                                );
                                        })}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Wrap marginTop={3}>
                                <Heading size={"md"}>Dire</Heading>
                                <Center>
                                    {data.radiant_win !== true ? (
                                        <RiVipCrownFill color="white" />
                                    ) : (
                                        ""
                                    )}
                                </Center>
                            </Wrap>
                            <TableContainer>
                                <Table
                                    variant="simple"
                                    colorScheme="whiteAlpha"
                                    textAlign={"center"}
                                >
                                    <Thead>
                                        <Th w="120px">
                                            <Center>Player</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>Level</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>K</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>D</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>A</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>IMP</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>CS</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>NET</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>GPM</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>XPM</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>HD</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>TD</Center>
                                        </Th>
                                        <Th w="10px" isNumeric>
                                            <Center>HH</Center>
                                        </Th>
                                        <Th w="250px">
                                            <Center>Items</Center>
                                        </Th>
                                    </Thead>
                                    <Tbody>
                                        {data.players.map((player) => {
                                            if (player.team_number == 1)
                                                return (
                                                    <Tr
                                                        key={player.account_id}
                                                        _hover={{
                                                            backgroundColor: "#242c36",
                                                            transition: "0.3s",
                                                        }}
                                                    >
                                                        <Td padding="2px">
                                                            <Wrap>
                                                                <Image
                                                                    src={player.hero_img}
                                                                    alt={player.hero_name}
                                                                    w="3em"
                                                                />
                                                                <Center>
                                                                    {playerName(player)}
                                                                </Center>
                                                            </Wrap>
                                                            <Spacer />
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>{player.level}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="green.300">{player.kills}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="red.400">{player.deaths}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="teal.200">{player.assists}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Tooltip
                                                                    label={"Impact Score: " + calcImpactNum(player, data.duration)}
                                                                >
                                                                    <Text
                                                                        color={
                                                                            {
                                                                                "S+": "gold",
                                                                                "F-": "#B7791F",
                                                                            }[calcImpact(
                                                                                calcImpactNum(player, data.duration)
                                                                            )] ||
                                                                            "#ffffff"
                                                                        }
                                                                        size="md"
                                                                        sx={{
                                                                            textShadow:
                                                                                {
                                                                                    "S+": "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                                                                                    "F-": "1px 1px 12px #B7791F, 1px 1px 12px #B7791F;",
                                                                                }[calcImpact(
                                                                                    calcImpactNum(player, data.duration)
                                                                                )] || "",
                                                                        }}
                                                                    >
                                                                        {calcImpact(
                                                                            calcImpactNum(player, data.duration)
                                                                        )}
                                                                    </Text>
                                                                </Tooltip>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {player.last_hits} / {player.denies}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text color="yellow.400">
                                                                    {convertToKNumber(player.net_worth)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>{player.gold_per_min}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>{player.xp_per_min}</Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {convertToKNumber(player.hero_damage)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {convertToKNumber(player.tower_damage)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Center>
                                                                <Text>
                                                                    {convertToKNumber(player.hero_healing)}
                                                                </Text>
                                                            </Center>
                                                        </Td>
                                                        <Td padding="2px" isNumeric>
                                                            <Stack direction="row" spacing={4}>
                                                                <Center>
                                                                    <Wrap spacing={0}>
                                                                        {makeItemBox(player.items[0])}
                                                                        {makeItemBox(player.items[1])}
                                                                        {makeItemBox(player.items[2])}
                                                                        {makeItemBox(player.items[3])}
                                                                        {makeItemBox(player.items[4])}
                                                                        {makeItemBox(player.items[5])}
                                                                    </Wrap>
                                                                </Center>
                                                                <Center>
                                                                    <Box>{makeNeutralBox(player.items[6])}</Box>
                                                                </Center>
                                                                <Center>
                                                                    <Box w={7}>
                                                                        {makeAghBox(
                                                                            player.aghanims_scepter,
                                                                            player.aghanims_shard
                                                                        )}
                                                                    </Box>
                                                                </Center>
                                                            </Stack>
                                                        </Td>
                                                    </Tr>
                                                );
                                        })}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Wrap marginTop={5} marginLeft={2} marginRight={2}>
                                {data.picks_bans.map((pick) => {
                                    if (pick.is_pick == true)
                                        return (
                                            <Box>
                                                <Image src={pick.img} alt={pick.order} w="3.5em" />
                                                <Box
                                                    bg={
                                                        data.players.filter(
                                                            (e) => e.hero_id === pick.hero_id
                                                        ).length > 0
                                                            ? "#242c36"
                                                            : "red.900"
                                                    }
                                                    borderRadius={"0px 0px 5px 5px"}
                                                >
                                                    <Text fontSize={"xs"} textAlign={"center"}>
                                                        Pick {pick.order + 1}
                                                    </Text>
                                                </Box>
                                            </Box>
                                        );
                                })}
                                <Spacer />
                                {data.picks_bans.map((pick) => {
                                    if (pick.is_pick == false)
                                        return (
                                            <Box>
                                                <Image src={pick.img} alt={pick.order} w="3.5em" />
                                                <Box bg="red.900" borderRadius={"0px 0px 5px 5px"}>
                                                    <Text fontSize={"xs"} textAlign={"center"}>
                                                        Ban{" "}
                                                        {pick.order -
                                                            data.picks_bans.filter((e) => e.is_pick == true)
                                                                .length +
                                                            1}
                                                    </Text>
                                                </Box>
                                            </Box>
                                        );
                                })}
                            </Wrap>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        );
    }
}

{
    /* <ModalContent id={props.matchid}/> */
}

export default MatchModal;

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

function convertToKNumber(num) {
    if (num >= 1000) {
        // Divide the number by 1000 and round to one decimal place
        let kNumber = (num / 1000).toFixed(1);

        // Add "k" to the end of the number and return it
        return kNumber + "k";
    }

    // Return the original number if it's less than 1000
    return num;
}

function makeItemBox(item) {
    if (item.id == 0) {
        return <Box bg="radial-gradient(#333333, #1a1a1a);" w="2.3em" />;
    } else {
        return (
            <Tooltip label={item.name}>
                <Box bg="#212121">
                    <Image src={item.img} alt={item.name} overflow="hidden" w="2.3em" />
                </Box>
            </Tooltip>
        );
    }
}

function makeNeutralBox(item) {
    if (item.id == 0) {
        return (
            <Box
                bg="radial-gradient(#8D99AE, #212121);"
                w="1.8em"
                borderRadius={500}
            />
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
                        w="1.8em"
                        h="1.8em"
                        borderRadius={500}
                    />
                </Box>
            </Tooltip>
        );
    }
}

function makeAghBox(scepter, shard) {
    if (scepter == 0 && shard == 0) {
        return (
            <Box>
                <Image src="/scepter_0.png" />
                <Image src="/shard_0.png" />
            </Box>
        );
    } else if (scepter == 1 && shard == 0) {
        return (
            <Box>
                <Image src="/scepter_1.png" />
                <Image src="/shard_0.png" />
            </Box>
        );
    } else if (scepter == 0 && shard == 1) {
        return (
            <Box>
                <Image src="/scepter_0.png" />
                <Image src="/shard_1.png" />
            </Box>
        );
    } else {
        return (
            <Box>
                <Image src="/scepter_1.png" />
                <Image src="/shard_1.png" />
            </Box>
        );
    }
}

function calcImpactNum(player, duration) {
    var csMin = player.last_hits / (duration / 60);
    var role = csMin > 3.5 ? "core" : "support";
    if (role === "core") {
        var kapmRating =
            ((player.kills * 2.5 + player.assists * 0.5) / (duration / 60)) ** 2;
        var deathRating = 3 / (player.deaths + 1);
        var csMinRating = csMin ** 1.5 / 20;
        var impact = kapmRating * 0.4 + deathRating * 0.4 + csMinRating * 0.2;
    } else {
        var kapmRating =
            ((player.kills + player.assists * 1.65) / (duration / 60)) ** 2;
        var deathRating = 5 / (player.deaths + 1.5);
        var impact = kapmRating * 0.4 + deathRating * 0.6;
    }
    return Math.floor(impact * 100);
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
