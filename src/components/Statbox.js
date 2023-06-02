import {
  Box,
  Center, Grid,
  GridItem,
  Heading,
  Link,
  Progress, Spacer,
  Spinner,
  Stack,
  Text,
  Tooltip,
  Wrap
} from "@chakra-ui/react";
import Image from "next/image";
import { React, useEffect, useState } from "react";

const Statbox = (props) => {
  const [stats, setStats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    fetch(`/api/stats/${props.type}?limit=${props.limit}&days=${props.days}${props.player ? `&player=${props.player}` : ""}`)
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
  var width = useWindowSize().width;

  if (loaded) {
    return (
      <Box boxShadow='0 5px 9px -2px rgba(0,0,0,.8)'>
        <Wrap bg='#1b2129' paddingLeft={3} paddingRight={3} paddingTop={2} paddingBottom={2}>
          <Heading size='lg'>{props.title}</Heading>
          <Spacer />
          <Center>
            <Text
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              Last {props.days} Days
            </Text>
          </Center>
        </Wrap>
        <Box bg='#242c36' padding='15px' paddingTop='5px' maxWidth={500}>
          <Stack>{makeBars(stats, props, width)}</Stack>
        </Box>
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
      <Text fontWeight='bold'>{props.type == "player" ? "Player" : "Hero"}</Text>
    </GridItem>
  );
  bars.push(<GridItem colSpan={1} />);
  bars.push(
    <GridItem colSpan={width <= 1100 ? 8 : 10}>
      <Text fontWeight='bold'>Matches</Text>
    </GridItem>
  );
  bars.push(<GridItem colSpan={1} />);
  bars.push(
    <GridItem colSpan={width <= 1100 ? 8 : 10}>
      <Text fontWeight='bold'>Win Rate</Text>
    </GridItem>
  );

  for (let index = 0; index < stats.length; index++) {
    var matchValue = ((stats[index].wins + stats[index].losses) / max) * 100;
    bars.push(
      <GridItem colSpan={width <= 1100 ? 8 : 4}>
        {props.type == "player" ? (
          <Link href={"/player/" + stats[index].id}  >
            <a rel='noopener noreferrer' passHref legacyBehavior>
              <Text
                fontSize='md'
                style={{
                  // do your styles depending on your needs.
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
                h='100%'
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
  if (value <= 45) return "red";
  if (value < 55 && value > 45) return "yellow";
  if (value >= 55) return "green";
}