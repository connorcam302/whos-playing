import { Box, Center, Flex, Heading, Image, LinkBox, Spacer, Text, Tooltip, Wrap } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function MatchRow(props) {
  return (
    <Box bgColor={props.match.winner == true? "#0b3014" : "#471210"} borderRightRadius="6px">
    <Flex marginBottom="10px">
        <Center>
        <Image w="8em" paddingRight="30px"           src={props.match.hero.img}
          alt={props.match.hero.name} />
        </Center>
        <Center>
        <Wrap>
        <Center><Box w="10em"><Heading size="md">{props.match.username}</Heading></Box></Center>
        <Center><Box w="6em"><Heading size="md">{makeWinnerText(props.match.winner)}</Heading></Box></Center>
        <Center><Heading size="md"><Box w="5em">                  {props.match.kills}/{props.match.deaths}/
                  {props.match.assists}</Box></Heading></Center>
        <Center><Wrap spacing="0px">
        {makeItemBox(props.match.items[0])}
        {makeItemBox(props.match.items[1])}
        {makeItemBox(props.match.items[2])}
        {makeItemBox(props.match.items[3])}
        {makeItemBox(props.match.items[4])}
        {makeItemBox(props.match.items[5])}
        </Wrap></Center>
        <Box paddingRight="10px" paddingLeft="10px">
            <Text color="#ef3a1b" fontWeight="bold" textAlign="right">
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
            <Text color="#00c59e" fontWeight="bold" textAlign="right">
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
          </Box>
          <Center><Box w="8em"><Text>              {calculateTime(
                props.match.start_time,
                props.match.duration
              )}</Text></Box></Center>
        </Wrap>
        </Center>
    </Flex>
    </Box>
  )
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
    var diffMs = now - matchDate;
    var diffMins = Math.round(diffMs / 60000 - duration / 60);
    if (diffMins < 59) {
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago.`;
    } else if (diffMins < 1440) {
      var hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago.`;
    } else if (diffMins < 44639) {
      var days = Math.floor(diffMins / (60 * 24));
      return `${days} day${days > 1 ? "s" : ""} ago.`;
    } else {
      var months = Math.floor(diffMins / (60 * 24 * 31));
      return `${months} month${days > 1 ? "s" : ""} ago.`;
    }
  }
  
  function makeItemBox(item) {
    if (item === null) {
      return <Box bg="radial-gradient(#8D99AE, #212121);" w="3em" />;
    } else {
      console.log(item.name)
      return (
        <Tooltip label={item.name}>
          <Box bg="#212121" w="3em">
            <Image src={item.img} alt={item.name}/>
          </Box>
        </Tooltip>
      );
    }
  }
