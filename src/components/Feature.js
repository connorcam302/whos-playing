import { Box, Center, Flex, Wrap } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import Climbing from "./featureBoxes/Climbing";
import Deaths from "./featureBoxes/Deaths";
import Descending from "./featureBoxes/Descending";
import GPM from "./featureBoxes/GPM";
import Impact from "./featureBoxes/Impact";
import Kills from "./featureBoxes/Kills";

const Feature = (props) => {
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

  const [image, setImage] = useState([]);
  const fetchImage = () => {
    fetch(`/api/splash-art`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchImage();
  }, []);

  console.log(image)

  return (
    <Center boxShadow="0 5px 15px -2px rgba(0,0,0,.8)">
      <Box
        backgroundImage={`/api/splash-art`}
        backgroundPosition={"center"}
        w={"100%"}
        h="25em"
      >
        <Center h={"100%"} backgroundColor={"rgba(0,0,0,0.75)"}>
          <Wrap w={"60em"} spacing="50px" justify="center" padding="1em">
            <Kills />
            <Impact />
            <Climbing />
            <Deaths />
            <GPM />
            <Descending />
          </Wrap>
        </Center>
      </Box>
    </Center>
  );
};

export default Feature;
