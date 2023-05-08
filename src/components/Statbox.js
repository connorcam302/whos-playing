import Head from "@/app/head";
import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Progress,
  Select,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { React, useEffect, useState } from "react";

const Statbox = (props) => {
  const [stats, setStats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    fetch(`/api/stats/${props.type}?limit=${props.limit}&days=${props.days}`)
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
  }, []);

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
  var width = useWindowSize().width

  if (loaded) {
    
    return (
      <Box margin={10} borderColor='white.reg' borderWidth='0.5px' borderRadius={10} padding='15px' width={500}>
        <Stack>
          <Wrap>
            <Heading>{props.title}</Heading>
            <Spacer />
            <Text
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              Last {props.days} Days
            </Text>
          </Wrap>
          <Divider />
          {makeBars(stats, props, width)}
        </Stack>
      </Box>
    );
  } else
    return (
      <Center>
        <Spinner color='white.reg' />
      </Center>
    );
};

export default Statbox;

function makeBars(stats, props, width) {
  let max = stats[0].wins + stats[0].losses;
  let bars = [];
  bars.push(
    <GridItem colSpan={width <= 1100 ? 8 : 4}>
      <Center>
        <Text>Hero</Text>
      </Center>
    </GridItem>
  );
  bars.push(
    <GridItem colSpan={width <= 1100 ? 8 : 10}>
      <Center>
        <Text>Matches</Text>
      </Center>
    </GridItem>
  );
  bars.push(
    <GridItem colSpan={width <= 1100 ? 8 : 10}>
      <Center>
        <Text>Win Rate</Text>
      </Center>
    </GridItem>
  );

  for (let index = 0; index < stats.length; index++) {
    var matchValue = ((stats[index].wins + stats[index].losses) / max) * 100;
    bars.push(
      <GridItem colSpan={width <= 1100 ? 8 : 4}>
        {props.type == "player" ? (
          <Text
            fontSize='md'
            style={{
              // do your styles depending on your needs.
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
            h='100%'
          >
            {stats[index].username}
          </Text>
        ) : (
          <Tooltip label={stats[index].name}>
            <Image
              alt={stats[index].name}
              loader={() => stats[index].img}
              src={stats[index].img}
              width={70}
              height={90}
              style={{ height: "auto", objectFit: "contain", position: "relative" }}
              unoptimized
            />
          </Tooltip>
        )}
      </GridItem>
    );
    bars.push(<GridItem colSpan={1} />);
    bars.push(
      <GridItem colSpan={width <= 1100 ? 8 : 10}>
        <Text fontSize='12pt'>{stats[index].wins + stats[index].losses}</Text>
        <Progress size='xs' value={matchValue} colorScheme='teal' marginTop='9px' />
      </GridItem>
    );
    bars.push(<GridItem colSpan={1} />);
    var winRate =
      stats[index].wins + stats[index].losses !== 0 ? Math.round((stats[index].wins / (stats[index].wins + stats[index].losses)) * 100 * 10) / 10 : 0;
    bars.push(
      <GridItem colSpan={width <= 1100 ? 8 : 10}>
        <Text fontSize='12pt'>{winRate}%</Text>
        <Progress size='xs' value={winRate} colorScheme={getColor(winRate)} marginTop='9px' />
      </GridItem>
    );
  }
  return (
    <Grid templateColumns='repeat(26, 1fr)' gap={2}>
      {bars}
    </Grid>
  );
}

function getColor(value) {
  if (value < 45) return "red";
  if (value < 55 && value > 45) return "yellow";
  if (value > 55) return "green";
}
