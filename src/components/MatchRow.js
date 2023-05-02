import { Box, Center, Flex, Heading, Image, LinkBox, Spacer, Text, Tooltip, Wrap } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function MatchRow(props) {
  if(props.match.status != 404){
  return (
    <Box bgColor={props.match.winner == true? "#0b3014" : "#471210"} borderRightRadius="6px">
    <Flex marginBottom="10px">
        <Center>
        <Image w="8em" paddingRight="30px"           src={props.match.hero.img}
          alt={props.match.hero.name} />
        </Center>
        <Center>
        <Wrap>
        <Center><Flex w="10em"paddingRight="10px"><Heading size="md">{props.match.username}</Heading><Spacer/><Text> {props.match.party_size > 1? `x ${props.match.party_size}`: ""}</Text></Flex></Center>
        <Center><Box w="5em"><Heading size="md">{makeWinnerText(props.match.winner)}</Heading></Box></Center>        
        <Center>
          <Box w="7em" paddingRight="10px" paddingLeft="10px">
            <Text fontWeight="bold" textAlign="center">
              {props.match.kills}/{props.match.deaths}/{props.match.assists}
            </Text>
            <Text textAlign="center">
              {Math.floor(props.match.duration / 60)}:{Math.round(props.match.duration % 60) > 10 ? Math.round(props.match.duration % 60) : "0" + Math.round(props.match.duration % 60)}
            </Text>
          </Box>
        </Center>
        <Center><Box w="3em"><Image src={ranks[props.match.rank]}/></Box></Center>   
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
      return (
        <Tooltip label={item.name}>
          <Box bg="#212121" w="3em">
            <Image src={item.img} alt={item.name}/>
          </Box>
        </Tooltip>
      );
    }
  }

var ranks = []
ranks["11"] = "SeasonalRank1-1.png"
ranks["12"] = "SeasonalRank1-2.png"
ranks["13"] = "SeasonalRank1-3.png"
ranks["14"] = "SeasonalRank1-4.png"
ranks["15"] = "SeasonalRank1-5.png"
ranks["21"] = "SeasonalRank2-1.png"
ranks["22"] = "SeasonalRank2-2.png"
ranks["23"] = "SeasonalRank2-3.png"
ranks["24"] = "SeasonalRank2-4.png"
ranks["25"] = "SeasonalRank2-5.png"
ranks["31"] = "SeasonalRank3-1.png"
ranks["32"] = "SeasonalRank3-2.png"
ranks["33"] = "SeasonalRank3-3.png"
ranks["34"] = "SeasonalRank3-4.png"
ranks["35"] = "SeasonalRank3-5.png"
ranks["41"] = "SeasonalRank4-1.png"
ranks["42"] = "SeasonalRank4-2.png"
ranks["43"] = "SeasonalRank4-3.png"
ranks["44"] = "SeasonalRank4-4.png"
ranks["45"] = "SeasonalRank4-5.png"
ranks["51"] = "/SeasonalRank5-1.png"
ranks["52"] = "/SeasonalRank5-2.png"
ranks["53"] = "/SeasonalRank5-3.png"
ranks["54"] = "SeasonalRank5-4.png"
ranks["55"] = "SeasonalRank5-5.png"
ranks["61"] = "SeasonalRank6-1.png"
ranks["62"] = "SeasonalRank6-2.png"
ranks["63"] = "SeasonalRank6-3.png"
ranks["64"] = "SeasonalRank6-4.png"
ranks["65"] = "SeasonalRank6-5.png"
ranks["71"] = "SeasonalRank7-1.png"
ranks["72"] = "SeasonalRank7-2.png"
ranks["73"] = "SeasonalRank7-3.png"
ranks["74"] = "SeasonalRank7-4.png"
ranks["75"] = "SeasonalRank7-5.png"
ranks["81"] = "SeasonalRankTop0.png"
ranks["99"] = "SeasonalRank0-0.png"
