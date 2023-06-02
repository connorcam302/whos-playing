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

  return (
    <Box bg={"#161b21"} w={"15em"} boxShadow="0 5px 9px -2px rgba(0,0,0,.8)">
      {props.children}
    </Box>
  );
};

export default FeatureBox;
