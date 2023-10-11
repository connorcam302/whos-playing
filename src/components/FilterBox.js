import React from "react";
import { useEffect, useState } from "react";
import { heroMap } from "../data/heroMap";
import Select from "react-select";
import {
    Box,
    Center,
    Flex,
    Spinner,
    Spacer,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

function FilterBox(props) {
    var heroes = [];
    let heroArray = Array.from(heroMap, ([id, data]) => ({ data }));
    heroArray.map((hero) => {
        heroes.push({ value: hero.data.id, label: hero.data.name });
    });
    heroes = heroes.sort((a, b) => a.label.localeCompare(b.label));
    heroes.unshift({ value: "all", label: "All Heroes" })

    const [players, setPlayers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const fetchData = () => {
        fetch(`/api/player/all`)
            .then((res) => res.json())
            .then((data) => {
                setPlayers(data);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    var playerOptions = [{ value: "all", label: "All Players" }];
    players.map((player) => {
        playerOptions.push({ value: player.id, label: player.username });
    });

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
            // borderRadius: state.isFocused ? "10px 10px 0px 0px" : "10px",
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
            padding: 0,
        }),
    };

    const [loading, setLoading] = useState(false);
    const refresh = () => {
        props.refreshButton(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <Flex p={2}>
            <Box w={"50%"} maxW={"20em"} minW={"10em"} paddingRight={2} paddingLeft={0}>
                <Select
                    options={heroes}
                    placeholder="All Heroes"
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
                    onChange={(e) => props.heroState(e.value)}
                />
            </Box>
            {props.playerOption == true ? (
                <Box w={"50%"} maxW={"20em"} paddingRight={2}>
                    <Select
                        options={playerOptions}
                        placeholder="All Players"
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
                        onChange={(e) => props.playerState(e.value)}
                    />
                </Box>
            ) : null}
            <Spacer />
            <Center>
                <Center
                    h={"100%"}
                    w={"2.5em"}
                    bg={"#242c36"}
                    color={"white"}
                    _hover={{ bg: "teal", cursor: "pointer" }}
                    onClick={() => refresh()}
                    size={"md"}
                    animation={"ripple 600ms linear"}
                >
                    {loading ? <Spinner /> : <FiRefreshCw />}
                </Center>
            </Center>
        </Flex>
    );
}

export default FilterBox;
