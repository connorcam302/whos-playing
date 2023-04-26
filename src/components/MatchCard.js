import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  Spacer,
  Box,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";

export default function MatchCard(props) {
  return (
    <Card width="15em">
      <Image
        objectFit="cover"
        width="70em"
        src={props.match.hero.img}
        alt={props.match.hero.name}
      />
      <CardBody paddingTop="0.5em">
        <Stack spacing="3">
          <Flex><Center>
            <Heading size="md">{props.match.player.name}</Heading>
            </Center>
            <Spacer />
            <Box>
            <Heading size="md" textAlign="right">
              {makeWinnerText(props.match.winner)}
              {props.match.kills}/{props.match.deaths}/{props.match.assists}
            </Heading>
            </Box>
          </Flex>
          <Text>{calculateTime(props.match.start_time, props.match.duration)}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex>
          <Text>
            <Link
              href={
                "https://www.opendota.com/matches/" +
                props.match.match_id
              }
              passHref
              legacyBehavior
            >
              <a target="_blank" rel="noopener noreferrer">
                OpenDota
              </a>
            </Link>
          </Text>
          <Spacer />
          <Text>
            <Link
              href={
                "https://www.dotabuff.com/matches/" +
                props.match.match_id
              }
              passHref
              legacyBehavior
            >
              <a target="_blank" rel="noopener noreferrer">
                Dotabuff
              </a>
            </Link>
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
}

function makeWinnerText(bool) {
  if (bool) {
    return <Text color="green">WIN</Text>;
  } else {
    return <Text color="red">LOSS</Text>;
  }
}

function calculateTime(epoch, duration) {
  var now = new Date();
  var matchDate = new Date(epoch * 1000);
  var diffMs = (now - matchDate);
  var diffMins = Math.round((diffMs/60000) - (duration/60));
  if (diffMins < 59) {
    return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago.`;
  } else if (diffMins < 1440) {
    var hours = Math.floor(diffMins / 60)
    return `${hours} hour${hours > 1 ? "s" : ""} ago.`;
  } else if (diffMins < 44639) {
    var days = Math.floor(diffMins / (60*24))
    return `${days} day${days > 1 ? "s" : ""} ago.`;
  } else {
    var months = Math.floor(diffMins / (60*24*31))
    return `${months} month${days > 1 ? "s" : ""} ago.`;
  }
}