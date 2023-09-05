import {
    Button,
    Center,
    Select,
    Stack,
    Text,
    Image,
    Box,
    Flex,
} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Descending from "./Descending";

const FeatureBox = (props) => {
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

    const [descending, setDescending] = useState([]);
    const fetchDescending = () => {
        fetch(`/api/feature/descending`)
            .then((res) => res.json())
            .then((data) => {
                setDescending(data);

            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchDescending();
    }, []);
    if (width >= 1100) {
        return (
            <Box bg={"#161b21"} w={"15em"} boxShadow="0 5px 9px -2px rgba(0,0,0,.8)">
                {props.children}
            </Box>
        );
    } else {
        return (
            <Box bg={"#161b21"} w={"100%"} boxShadow="0 5px 9px -2px rgba(0,0,0,.8)">
                {props.children}
            </Box>
        )
    }

};

export default FeatureBox;
