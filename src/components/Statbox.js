import {
    Box,
    Center,
    Grid,
    GridItem,
    Heading,
    Link,
    Progress,
    Spacer,
    Spinner,
    Stack,
    Text,
    Tooltip,
    Wrap,
    Flex,
    HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import Select from "react-select";
import Cookies from "js-cookie";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"
import { filter } from "domutils";

const Statbox = (props) => {
    const dayMap = new Map();
    dayMap.set(1, "Last 24 Hours");
    dayMap.set(7, "Last 7 Days");
    dayMap.set(14, "Last 14 Days");
    dayMap.set(31, "Last 31 Days");
    dayMap.set(92, "Last 3 Months");

    const [primaryFilter, setPrimaryFilter] = useState(<div />)
    const [primaryFilterCounter, setPrimaryFilterCounter] = useState(0)
    const [matchesFilter, setMatchesFilter] = useState(<div />)
    const [matchesFilterCounter, setMatchesFilterCounter] = useState(0)
    const [winRateFilter, setWinRateFilter] = useState(<div />)
    const [winRateFilterCounter, setWinRateFilterCounter] = useState(0)

    const [filterBy, setFilterBy] = useState(null)

    const handlePrimaryFilter = () => {
        setPrimaryFilterCounter(primaryFilterCounter + 1)
        let counter = primaryFilterCounter + 1
        if (props.type == "player") {
            if (counter % 3 == 0) {
                setPrimaryFilter(<div />)
                let newStats = [...stats].sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses));
                setStats(newStats)
            } if (counter % 3 == 1) {
                setPrimaryFilter(<AiFillCaretUp />)
                let newStats = [...stats].sort((a, b) => a.username.localeCompare(b.username));
                setStats(newStats)
            } if (counter % 3 == 2) {
                setPrimaryFilter(<AiFillCaretDown />)
                let newStats = [...stats].sort((a, b) => b.username.localeCompare(a.username));
                setStats(newStats)
            }
        } else {
            if (counter % 3 == 0) {
                setPrimaryFilter(<div />)
                let newStats = [...stats].sort((a, b) => (a.wins + a.losses) - (b.wins + b.losses));
                setStats(newStats)
            } if (counter % 3 == 1) {
                setPrimaryFilter(<AiFillCaretUp />)
                let newStats = [...stats].sort((a, b) => a.name.localeCompare(b.username));
                setStats(newStats)
            } if (counter % 3 == 2) {
                setPrimaryFilter(<AiFillCaretDown />)
                let newStats = [...stats].sort((a, b) => a.name.localeCompare(b.username));
                setStats(newStats)
            }
        }

        setMatchesFilterCounter(0)
        setWinRateFilterCounter(0)

        setMatchesFilter(<div />)
        setWinRateFilter(<div />)
    }

    const handleMatchesFilter = () => {
        setMatchesFilterCounter(matchesFilterCounter + 1)
        let counter = matchesFilterCounter + 1
        if (counter % 3 == 0) {
            setMatchesFilter(<div />)
            setFilterBy([null, null])
            let newStats = [...stats].sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses));
            setStats(newStats)
        } if (counter % 3 == 1) {
            setMatchesFilter(<AiFillCaretUp />)
            let newStats = [...stats].sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses));
            setStats(newStats)
        } if (counter % 3 == 2) {
            setMatchesFilter(<AiFillCaretDown />)
            let newStats = [...stats].sort((a, b) => (a.wins + a.losses) - (b.wins + b.losses));
            setStats(newStats)
        }

        setPrimaryFilterCounter(0)
        setWinRateFilterCounter(0)

        setWinRateFilter(<div />)
        setPrimaryFilter(<div />)
    }

    const handleWinRateFilter = () => {
        setWinRateFilterCounter(winRateFilterCounter + 1)
        let counter = winRateFilterCounter + 1
        if (counter % 3 == 0) {
            setWinRateFilter(<div />)
            let newStats = [...stats].sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses));
            setStats(newStats)
        } if (counter % 3 == 1) {
            setWinRateFilter(<AiFillCaretUp />)
            let newStats = [...stats].sort((a, b) => (b.wins / (b.wins + b.losses)) - (a.wins / (a.wins + a.losses)));
            setStats(newStats)
        } if (counter % 3 == 2) {
            setWinRateFilter(<AiFillCaretDown />)
            let newStats = [...stats].sort((a, b) => (a.wins / (a.wins + a.losses)) - (b.wins / (b.wins + b.losses)));
            setStats(newStats)
        }

        setPrimaryFilterCounter(0)
        setMatchesFilterCounter(0)

        setMatchesFilter(<div />)
        setPrimaryFilter(<div />)
    }

    const [stats, setStats] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [days, setDays] = useState(
        Cookies.get("days") == null ? 14 : Cookies.get("days")
    );
    const [daysText, setDaysText] = useState(dayMap.get(Number(days)));
    const fetchData = () => {
        fetch(
            `/api/stats/${props.type}?limit=${props.limit}&days=${days}${props.player ? `&player=${props.player}` : ""
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchData();
        Cookies.set("days", days);
        console.log(daysText, days);
    }, [days]);

    const customStyles = {
        option: (base, state) => ({
            ...base,
            color: "white",
            backgroundColor: state.isSelected ? "#0d131f" : "#242c36",
            "&:hover": { backgroundColor: "teal" },
            padding: ".5rem 3rem .5rem .5rem",
            cursor: "pointer",
        }),
        control: (base, state) => ({
            ...base,
            color: "white",
            background: "#242c36",
            // match with the menu
            // Overwrittes the different states of border
            borderColor: "#242c36",
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: "gray",
            },
        }),
        menu: (base) => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0,
        }),
        menuList: (base) => ({
            ...base,
            // kill the white space on first and last option
            boxShadow: "2px 5px 10px rgb(0 0 0 / 0.5)",
            padding: 0,
        }),
    };

    const dayOptions = [
        { value: 1, label: "Last 24 Hours" },
        { value: 7, label: "Last 7 Days" },
        { value: 14, label: "Last 14 Days" },
        { value: 31, label: "Last 31 Days" },
        { value: 92, label: "Last 3 Months" },
    ];

    const makeBars = (stats, props, width) => {
        let max = stats.reduce((maxMatches, currentUser) => Math.max(maxMatches, currentUser.wins + currentUser.losses), 0);
        console.log(max)
        let bars = [];
        bars.push(
            <GridItem colSpan={width <= 1100 ? 8 : 4} onClick={() => handlePrimaryFilter()}>
                <HStack spacing="6px">
                    <Text fontWeight="bold">{props.type == "player" ? "Player" : "Hero"}</Text>
                    <Center>
                        <Text fontWeight="bold">{primaryFilter}</Text>
                    </Center>
                </HStack>
            </GridItem>
        );
        bars.push(<GridItem colSpan={1} />);
        bars.push(
            <GridItem colSpan={width <= 1100 ? 8 : 10} onClick={() => handleMatchesFilter()}>
                <HStack spacing="6px">
                    <Text fontWeight="bold">Matches</Text>
                    <Center>
                        <Text fontWeight="bold">{matchesFilter}</Text>
                    </Center>
                </HStack>
            </GridItem>
        );
        bars.push(<GridItem colSpan={1} />);
        bars.push(
            <GridItem colSpan={width <= 1100 ? 8 : 10} onClick={() => handleWinRateFilter()}>
                <HStack spacing="6px">
                    <Text fontWeight="bold">Win Rate</Text>
                    <Center>
                        <Text fontWeight="bold">{winRateFilter}</Text>
                    </Center>
                </HStack>
            </GridItem>
        );

        for (let index = 0; index < stats.length; index++) {
            var matchValue = ((stats[index].wins + stats[index].losses) / max) * 100;
            bars.push(
                <GridItem colSpan={width <= 1100 ? 8 : 4}>
                    {props.type == "player" ? (
                        <Link href={"/player/" + stats[index].id}>
                            <a rel="noopener noreferrer" passHref legacyBehavior>
                                <Text
                                    fontSize="md"
                                    style={{
                                        // do your styles depending on your needs.
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
                                    {stats[index].username}
                                </Text>
                            </a>
                        </Link>
                    ) : (
                        <Tooltip label={stats[index].name}>
                            <Image
                                alt={stats[index].name}
                                loader={() => stats[index].img}
                                src={stats[index].img}
                                width={70}
                                height={90}
                                style={{
                                    height: "auto",
                                    objectFit: "contain",
                                    position: "relative",
                                }}
                                unoptimized
                            />
                        </Tooltip>
                    )}
                </GridItem>
            );
            bars.push(<GridItem colSpan={1} />);
            bars.push(
                <GridItem colSpan={width <= 1100 ? 8 : 10}>
                    <Text fontSize="12pt">{stats[index].wins + stats[index].losses}</Text>
                    <Progress
                        size="xs"
                        value={matchValue}
                        colorScheme="teal"
                        marginTop="9px"
                    />
                </GridItem>
            );
            bars.push(<GridItem colSpan={1} />);
            var winRate =
                stats[index].wins + stats[index].losses !== 0
                    ? Math.round(
                        (stats[index].wins / (stats[index].wins + stats[index].losses)) *
                        100 *
                        10
                    ) / 10
                    : 0;
            bars.push(
                <GridItem colSpan={width <= 1100 ? 8 : 10}>
                    <Text fontSize="12pt">{winRate}%</Text>
                    <Progress
                        size="xs"
                        value={winRate}
                        colorScheme={getColor(winRate)}
                        marginTop="9px"
                    />
                </GridItem>
            );
        }
        return (
            <Grid templateColumns="repeat(26, 1fr)" gap={2}>
                {bars}
            </Grid>
        );
    }

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

    if (loaded) {
        return (
            <Box boxShadow="0 5px 9px -2px rgba(0,0,0,.8)">
                <Wrap
                    bg="#1b2129"
                    paddingLeft={3}
                    paddingRight={3}
                    paddingTop={2}
                    paddingBottom={2}
                >
                    <Heading size="lg">{props.title}</Heading>
                    <Spacer />
                    <Center>
                        <Box w={"10em"}>
                            <Select
                                options={dayOptions}
                                placeholder={daysText}
                                styles={customStyles}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        text: "#3599B8",
                                        font: "#3599B8",
                                        primary25: "#3599B8",
                                        primary: "white",
                                        neutral80: "white",
                                        color: "black",
                                    },
                                })}
                                onChange={(e) => setDays(e.value)}
                                menuPortalTarget={document.querySelector("body")}
                            />
                        </Box>
                    </Center>
                </Wrap>
                <Box bg="#242c36" padding="15px" paddingTop="5px">
                    <Stack>{makeBars(stats, props, width)}</Stack>
                </Box>
            </Box>
        );
    } else
        return (
            <Center>
                <Spinner color="white.reg" />
            </Center>
        );
};

export default Statbox;

function getColor(value) {
    if (value <= 45) return "red";
    if (value < 55 && value > 45) return "yellow";
    if (value >= 55) return "green";
}
