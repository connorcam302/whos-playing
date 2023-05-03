import { Button, Center, Select, Stack, Text } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const PageButtons = (props) => {
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const fetchData = () => {
    fetch(`/api/player/all`)
      .then((res) => res.json())
      .then((data) => {
        setOptionList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Center>
      <Stack padding='10px' spacing={4} direction='row' align='center'>
        <Button
          bg='blue.reg'
          color='white'
          _hover={{
            bg: "#2a9d8f",

            transition: "0.3s",
          }}
          size='md'
          onClick={props.decrease}
        >
          <AiOutlineArrowLeft />
        </Button>
        <Button
          bg='blue.reg'
          color='white'
          _hover={{
            bg: "#2a9d8f",

            transition: "0.3s",
          }}
          size='md'
          onClick={props.increase}
        >
          <AiOutlineArrowRight />
        </Button>
      </Stack>
    </Center>
  );
};

export default PageButtons;
