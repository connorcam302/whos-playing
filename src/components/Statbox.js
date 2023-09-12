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
    SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import Select from "react-select";
import Cookies from "js-cookie";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { filter } from "domutils";

const Statbox = (props) => {
    const dayMap = new Map();
    dayMap.set(1, "Last 24 Hours");
    dayMap.set(7, "Last 7 Days");
    dayMap.set(14, "Last 14 Days");
    dayMap.set(31, "Last 31 Days");
    dayMap.set(92, "Last 3 Months");

    const [primaryFilter, setPrimaryFilter] = useState(<div />);
    const [primaryFilterCounter, setPrimaryFilterCounter] = useState(0);
    const [matchesFilter, setMatchesFilter] = useState(<div />);
    const [matchesFilterCounter, setMatchesFilterCounter] = useState(0);
    const [winRateFilter, setWinRateFilter] = useState(<div />);
    const [winRateFilterCounter, setWinRateFilterCounter] = useState(0);
    const [xIFilter, setXIFilter] = useState(<div />);
    const [xIFilterCounter, setXIFilterCounter] = useState(0);

    const [filterBy, setFilterBy] = useState(null);

    const handlePrimaryFilter = () => {
        setPrimaryFilterCounter(primaryFilterCounter + 1);
        let counter = primaryFilterCounter + 1;
        if (props.type == "player") {
            if (counter % 3 == 0) {
                setPrimaryFilter(<div />);
                let newStats = [...stats].sort(
                    (a, b) => b.wins + b.losses - (a.wins + a.losses)
                );
                setStats(newStats);
            }
            if (counter % 3 == 1) {
                setPrimaryFilter(<AiFillCaretUp />);
                let newStats = [...stats].sort((a, b) =>
                    a.username.localeCompare(b.username)
                );
                setStats(newStats);
            }
            if (counter % 3 == 2) {
                setPrimaryFilter(<AiFillCaretDown />);
                let newStats = [...stats].sort((a, b) =>
                    b.username.localeCompare(a.username)
                );
                setStats(newStats);
            }
        } else {
            if (counter % 3 == 0) {
                setPrimaryFilter(<div />);
                let newStats = [...stats].sort(
                    (a, b) => a.wins + a.losses - (b.wins + b.losses)
                );
                setStats(newStats);
            }
            if (counter % 3 == 1) {
                setPrimaryFilter(<AiFillCaretUp />);
                let newStats = [...stats].sort((a, b) => a.name.localeCompare(b.name));
                setStats(newStats);
            }
            if (counter % 3 == 2) {
                setPrimaryFilter(<AiFillCaretDown />);
                let newStats = [...stats].sort((a, b) => a.name.localeCompare(b.name));
                setStats(newStats);
            }
        }

        setMatchesFilterCounter(0);
        setWinRateFilterCounter(0);
        setXIFilterCounter(0);

        setMatchesFilter(<div />);
        setWinRateFilter(<div />);
        setXIFilter(<div />);
    };

    const handleMatchesFilter = () => {
        setMatchesFilterCounter(matchesFilterCounter + 1);
        let counter = matchesFilterCounter + 1;
        if (counter % 3 == 0) {
            setMatchesFilter(<div />);
            setFilterBy([null, null]);
            let newStats = [...stats].sort(
                (a, b) => b.wins + b.losses - (a.wins + a.losses)
            );
            setStats(newStats);
        }
        if (counter % 3 == 1) {
            setMatchesFilter(<AiFillCaretUp />);
            let newStats = [...stats].sort(
                (a, b) => b.wins + b.losses - (a.wins + a.losses)
            );
            setStats(newStats);
        }
        if (counter % 3 == 2) {
            setMatchesFilter(<AiFillCaretDown />);
            let newStats = [...stats].sort(
                (a, b) => a.wins + a.losses - (b.wins + b.losses)
            );
            setStats(newStats);
        }

        setPrimaryFilterCounter(0);
        setWinRateFilterCounter(0);
        setXIFilterCounter(0);

        setWinRateFilter(<div />);
        setPrimaryFilter(<div />);
        setXIFilter(<div />);
    };

    const handleWinRateFilter = () => {
        setWinRateFilterCounter(winRateFilterCounter + 1);
        let counter = winRateFilterCounter + 1;
        if (counter % 3 == 0) {
            setWinRateFilter(<div />);
            let newStats = [...stats].sort(
                (a, b) => b.wins + b.losses - (a.wins + a.losses)
            );
            setStats(newStats);
        }
        if (counter % 3 == 1) {
            setWinRateFilter(<AiFillCaretUp />);
            let newStats = [...stats].sort(
                (a, b) => b.wins / (b.wins + b.losses) - a.wins / (a.wins + a.losses)
            );
            setStats(newStats);
        }
        if (counter % 3 == 2) {
            setWinRateFilter(<AiFillCaretDown />);
            let newStats = [...stats].sort(
                (a, b) => a.wins / (a.wins + a.losses) - b.wins / (b.wins + b.losses)
            );
            setStats(newStats);
        }

        setPrimaryFilterCounter(0);
        setMatchesFilterCounter(0);
        setXIFilterCounter(0);

        setMatchesFilter(<div />);
        setPrimaryFilter(<div />);
        setXIFilter(<div />);
    };

    const handleXIFilter = () => {
        setXIFilterCounter(xIFilterCounter + 1);
        let counter = xIFilterCounter + 1;
        if (counter % 3 == 0) {
            setXIFilter(<div />);
            let newStats = [...stats].sort(
                (a, b) => b.wins + b.losses - (a.wins + a.losses)
            );
            setStats(newStats);
        }
        if (counter % 3 == 1) {
            setXIFilter(<AiFillCaretUp />);
            let newStats = [...stats].sort((a, b) => b.impact - a.impact);
            setStats(newStats);
        }
        if (counter % 3 == 2) {
            setXIFilter(<AiFillCaretDown />);
            let newStats = [...stats].sort((a, b) => a.impact - b.impact);
            setStats(newStats);
        }

        setPrimaryFilterCounter(0);
        setMatchesFilterCounter(0);
        setWinRateFilterCounter(0);

        setMatchesFilter(<div />);
        setPrimaryFilter(<div />);
        setWinRateFilter(<div />);
    };

    const [stats, setStats] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [days, setDays] = useState(
        Cookies.get("days") == null ? 14 : Cookies.get("days")
    );
    const [daysText, setDaysText] = useState(dayMap.get(Number(days)));
    const fetchData = () => {
        fetch(
            `/api/stats/${props.type}?&days=${days}${props.player ? `&player=${props.player}` : ""
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

    const getColour = (value) => {
        if (value > 52) {
            if (value > 56) {
                return "#16a34a";
            }
            return "#84cc16";
        } else if (value < 48) {
            if (value < 44) {
                return "#dc2626";
            }
            return "#f97316";
        } else {
            return "#eab308";
        }
    };

    const makeBar = (width, colour) => {
        if (isNaN(width)) width = 0;
        return (
            <Flex w="100%" h={1}>
                <Box w={`${width}%`} sx={{ backgroundColor: colour }} />
                <Box w={`${100 - width}%`} sx={{ backgroundColor: "#f5f5f5" }} />
            </Flex>
        );
    };

    const makeStatDisplay = () => {
        let bars = [
            <GridItem
                key={`header-primary`}
                colSpan={2}
                onClick={() => handlePrimaryFilter()}
            >
                <HStack spacing="6px">
                    <Text>{props.type == "player" ? "Player" : "Hero"}</Text>
                    <Center>
                        <Text fontWeight={"bold"}>{primaryFilter}</Text>
                    </Center>
                </HStack>
            </GridItem>,
            <GridItem
                key={`header-matches`}
                colSpan={3}
                onClick={() => handleMatchesFilter()}
            >
                <HStack spacing="6px">
                    <Text>Matches</Text>
                    <Center>
                        <Text fontWeight={"bold"}>{matchesFilter}</Text>
                    </Center>
                </HStack>
            </GridItem>,
            <GridItem
                key={`header-winrate`}
                colSpan={3}
                onClick={() => handleWinRateFilter()}
            >
                <HStack spacing="6px">
                    <Text>Win Rate</Text>
                    <Center>
                        <Text fontWeight={"bold"}>{winRateFilter}</Text>
                    </Center>
                </HStack>
            </GridItem>,
            <GridItem key={`header-xi`} colSpan={3} onClick={() => handleXIFilter()}>
                <HStack spacing="6px">
                    <Text>xImpact</Text>
                    <Center>
                        <Text fontWeight={"bold"}>{xIFilter}</Text>
                    </Center>
                </HStack>
            </GridItem>,
        ];

        let max = stats.reduce(
            (maxMatches, currentUser) =>
                Math.max(maxMatches, currentUser.wins + currentUser.losses),
            0
        );

        if (props.type == "player") {
            stats.map((stat, i) => {
                bars.push(
                    <GridItem
                        key={`${i}-primary`}
                        colSpan={2}
                        display="flex"
                        alignItems="center"
                    >
                        <Box>
                            <Link href={"/player/" + stat.id} passHref legacyBehavior>
                                <a rel="noopener noreferrer">
                                    <Text
                                        _hover={{ color: "#808080", transition: "0.3s" }}
                                        size="md"
                                    >
                                        {stat.username}
                                    </Text>
                                </a>
                            </Link>
                        </Box>
                    </GridItem>
                );
                bars.push(
                    <GridItem key={`${i}-matches`} colSpan={3}>
                        <Text>{stat.wins + stat.losses}</Text>
                        <Box pt={1}>
                            {makeBar(((stat.wins + stat.losses) / max) * 100, "#319795")}
                        </Box>
                    </GridItem>
                );
                let winRate = (
                    Math.round((stat.wins / (stat.wins + stat.losses)) * 100 * 100) / 100
                ).toFixed(2);
                if (isNaN(winRate)) winRate = 0;
                bars.push(
                    <GridItem key={`${i}-winrate`} colSpan={3}>
                        <Text>{isNaN(winRate) ? 0 : winRate}%</Text>
                        <Box pt={1}>{makeBar(winRate, getColour(winRate))}</Box>
                    </GridItem>
                );
                bars.push(
                    <GridItem key={`${i}-xi`} colSpan={3}>
                        <Text>
                            {stat.impact !== null ? calcImpact(stat.impact) : "No Matches"}
                        </Text>
                        <Tooltip label={`xImpact: ${Math.floor(stat.impact)}`}>
                            <Box pt={1}>{makeBar((stat.impact / 120) * 100, "#7c3aed")}</Box>
                        </Tooltip>
                    </GridItem>
                );
            });
        } else {
            stats.map((stat, i) => {
                bars.push(
                    <GridItem
                        key={`${i}-primary`}
                        colSpan={2}
                        display="flex"
                        alignItems="center"
                    >
                        <Box backgroundImage={stat.img} h={"33.75px"} w={"60px"} backgroundSize={"contain"}>
                            <Text
                                _hover={{ cursor: "default" }}
                                fontSize="6"
                                color={"rgba(0, 0, 0, 0)"}
                            >
                                {stat.name}
                            </Text>
                        </Box>
                    </GridItem>
                );
                bars.push(
                    <GridItem key={`${i}-matches`} colSpan={3}>
                        <Text>{stat.wins + stat.losses}</Text>
                        <Box pt={1}>
                            {makeBar(((stat.wins + stat.losses) / max) * 100, "#319795")}
                        </Box>
                    </GridItem>
                );
                let winRate = (
                    Math.round((stat.wins / (stat.wins + stat.losses)) * 100 * 100) / 100
                ).toFixed(2);
                bars.push(
                    <GridItem key={`${i}-winrate`} colSpan={3}>
                        <Text>{winRate}%</Text>
                        <Box pt={1}>{makeBar(winRate, getColour(winRate))}</Box>
                    </GridItem>
                );
                bars.push(
                    <GridItem key={`${i}-xi`} colSpan={3}>
                        <Text>
                            {stat.impact !== null ? calcImpact(stat.impact) : "No Matches"}
                        </Text>
                        <Box pt={1}>{makeBar((stat.impact / 120) * 100, "#7c3aed")}</Box>
                    </GridItem>
                );
            });
        }

        return bars;
    };

    if (loaded) {
        return (
            <Box>
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
                <Box h={props.height} bg="#242c36" padding="15px" paddingTop="5px" overflow={"auto"} css={{
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
                    <Grid templateColumns="repeat(11, 1fr)" gap={3}>
                        {makeStatDisplay()}
                    </Grid>
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
    if (impact >= 35) {
        return "D";
    }
    if (impact < 35) {
        return "D-";
    }
    if (impact >= 30) {
        return "F+";
    }
    if (impact >= 25) {
        return "F";
    }
    if (impact >= 20) {
        return "F-";
    } else {
        return "Error";
    }
}
