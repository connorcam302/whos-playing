import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function MatchCard(props) {
  return (
    // <Box w='21.5em' bgColor={props.match.winner == true ? "#0b3014" : "#471210"} borderRadius='10px 10px 0 0px'>
    //   <Wrap spacing={5} margin={1} paddingLeft={1} paddingRight={1}>
    //     <Center>
    //       <Link href={"/player/" + props.match.player_id} passHref legacyBehavior>
    //         <a rel='noopener noreferrer'>
    //           <Flex w='3em'>
    //             <Center>
    //               <Heading size='md'>{props.match.username}</Heading>
    //             </Center>
    //             <Spacer />
    //           </Flex>
    //         </a>
    //       </Link>
    //     </Center>
    //     <Spacer />
    //     <Center>
    //       <Heading size='md' textAlign='right'>
    //         {makeWinnerText(props.match.winner)}
    //       </Heading>
    //     </Center>
    //     <Spacer />
    //     <Center>
    //       <Text size='md' textAlign='right'>
    //         {props.match.kills}/{props.match.deaths}/{props.match.assists}
    //       </Text>
    //     </Center>
    //     <Spacer />
    //     <Center>
    //       <Text textAlign='center'>
    //         {Math.floor(props.match.duration / 60)}:
    //         {Math.round(props.match.duration % 60) > 10 ? Math.round(props.match.duration % 60) : "0" + Math.round(props.match.duration % 60)}
    //       </Text>
    //     </Center>
    //   </Wrap>
    //   <Divider marginBottom={1.5} />
    //   <Wrap spacing={0}>
    //     <Box>
    //       <Wrap spacing={0}>
    //         <Image height='3.3em' src={props.match.hero.img} alt={props.match.hero.name} sx={{ margin: 0 }} />
    //         <Box w={1} />
    //         <Box>
    //           <Wrap>
    //             <Box>
    //               <Flex>
    //                 {makeItemBox(props.match.items[0])}
    //                 {makeItemBox(props.match.items[1])}
    //                 {makeItemBox(props.match.items[2])}
    //               </Flex>
    //               <Flex style={{ marginTop: 0 }}>
    //                 {makeItemBox(props.match.items[3])}
    //                 {makeItemBox(props.match.items[4])}
    //                 {makeItemBox(props.match.items[5])}
    //               </Flex>
    //             </Box>
    //             <Center>
    //               <Box w='1.8em'>{makeNeutralBox(props.match.items[6])}</Box>
    //             </Center>
    //             <Center>
    //               <Box w='2.3em'>{makeAghBox(props.match.aghanims_scepter, props.match.aghanims_shard)}</Box>
    //             </Center>
    //             <Box paddingRight='0.2em' paddingLeft='0.2em'>
    //               <Text color='#ef3a1b' fontWeight='bold' textAlign='right'>
    //                 <Link href={"https://www.dotabuff.com/matches/" + props.match.match_id} passHref legacyBehavior>
    //                   <a target='_blank' rel='noopener noreferrer'>
    //                     <Image src='/dotabuff-logo.png' alt='Dotabuff' boxSize='1.2em' display='inline-block' verticalAlign='middle' />
    //                   </a>
    //                 </Link>
    //               </Text>
    //               <Text color='#00c59e' fontWeight='bold' textAlign='right'>
    //                 <Link href={"https://www.opendota.com/matches/" + props.match.match_id} passHref legacyBehavior>
    //                   <a target='_blank' rel='noopener noreferrer'>
    //                     <Image src='/opendota-logo.png' alt='OpenDota' boxSize='1.2em' display='inline-block' verticalAlign='middle' />
    //                   </a>
    //                 </Link>
    //               </Text>
    //             </Box>
    //           </Wrap>
    //         </Box>
    //       </Wrap>
    //     </Box>
    //   </Wrap>
    // </Box>
    <Flex
      w={"100vw"}
      // backgroundColor={"#242c36"}
      bg={
        props.match.winner == true
          ? "linear-gradient(to left, #242c36, #242c36, #2f4c39,#2f4c39)"
          : "linear-gradient(to left, #242c36, #242c36, #AA4344,#AA4344)"
      }
    >
      <Image
        height="3em"
        src={props.match.hero.img}
        alt={props.match.hero.name}
        sx={{ margin: 0 }}
      />
      <Flex w={"100%"} paddingLeft={2}>
        <Center>
          <Link
            href={"/player/" + props.match.player_id}
            passHref
            legacyBehavior
          >
            <a rel="noopener noreferrer">
              <Flex w="4em">
                <Center>
                  <Heading size="sm" textAlign={"left"}>
                    {props.match.username}
                  </Heading>
                </Center>
                <Spacer />
              </Flex>
            </a>
          </Link>
        </Center>
        <Center w={"3em"}>
          <Tooltip label={"Impact Score: " + props.match.impact}>
            <Center>
              <Heading
                     color={
                      {
                        "S+": "gold",
                        "F-": "#B7791F",
                      }[calcImpact(props.match.impact)] || "#ffffff"
                    }
                    size="md"
                    sx={{
                      textShadow:
                        {
                          "S+": "1px 1px 12px #fff, 1px 1px 12px #ccc;",
                          "F-": "1px 1px 12px #B7791F, 1px 1px 12px #B7791F;",
                        }[calcImpact(props.match.impact)] || "",
                    }}
                textAlign={"center"}
              >
                {calcImpact(props.match.impact)}
              </Heading>
            </Center>
          </Tooltip>
        </Center>
        <Spacer />
        <Center>
          <Stack spacing={"0"}>
            <Center>
              <Text textAlign="center" fontSize="sm">
                {props.match.kills}/{props.match.deaths}/{props.match.assists}
              </Text>
            </Center>
            <Center>
              <Text textAlign="center" fontSize="sm">
                {Math.floor(props.match.duration / 60)}:
                {Math.round(props.match.duration % 60) > 10
                  ? Math.round(props.match.duration % 60)
                  : "0" + Math.round(props.match.duration % 60)}
              </Text>
            </Center>
          </Stack>
        </Center>
        <Spacer />
        <Center w={"4em"}>
          <Text fontSize="sm" textAlign="center" lineHeight={"10pt"}>
            {calculateTime(props.match.start_time, props.match.duration)}
          </Text>
        </Center>
      </Flex>
      <Spacer />
      <Center paddingRight="0.2em" paddingLeft="0.2em" w={"3em"}>
        <Stack spacing={"4px"}>
          <Link
            href={"https://www.dotabuff.com/matches/" + props.match.match_id}
            passHref
            legacyBehavior
          >
            <Image
              src="/dotabuff-logo.png"
              alt="Dotabuff"
              boxSize="1em"
              display="inline-block"
              verticalAlign="middle"
            />
          </Link>
          <Link
            href={"https://www.opendota.com/matches/" + props.match.match_id}
            passHref
            legacyBehavior
          >
            <Image
              src="/opendota-logo.png"
              alt="OpenDota"
              boxSize="1em"
              display="inline-block"
              verticalAlign="middle"
            />
          </Link>
        </Stack>
      </Center>
    </Flex>
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
  // @ts-ignore
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
  if (item.img === null) {
    return <Box bg="radial-gradient(#333333, #1a1a1a);" w="2.25em" />;
  } else {
    return (
      <Tooltip label={item.name}>
        <Box bg="#212121" w="2.25em">
          <Image src={item.img} alt={item.name} />
        </Box>
      </Tooltip>
    );
  }
}

function makeAghBox(scepter, shard) {
  if (scepter == 0 && shard == 0) {
    return (
      <Box w="2em">
        <Image src="/scepter_0.png" />
        <Image src="/shard_0.png" />
      </Box>
    );
  } else if (scepter == 1 && shard == 0) {
    return (
      <Box w="2em">
        <Image src="/scepter_1.png" />
        <Image src="/shard_0.png" />
      </Box>
    );
  } else if (scepter == 0 && shard == 1) {
    return (
      <Box w="2em">
        <Image src="/scepter_0.png" />
        <Image src="/shard_1.png" />
      </Box>
    );
  } else {
    return (
      <Box w="2em">
        <Image src="/scepter_1.png" />
        <Image src="/shard_1.png" />
      </Box>
    );
  }
}

function makeNeutralBox(item) {
  if (item.id == 0) {
    return (
      <Box bg="radial-gradient(#8D99AE, #212121);" w="2em" borderRadius={500} />
    );
  } else {
    return (
      <Tooltip label={item.name}>
        <Box>
          <Image
            src={item.img}
            alt={item.name}
            objectFit="cover"
            overflow="hidden"
            w="2em"
            h="2em"
            borderRadius={500}
          />
        </Box>
      </Tooltip>
    );
  }
}

function calcImpact(impact) {
  if (impact > 120) {
    return "S+";
  }
  if (impact > 95) {
    return "S";
  }
  if (impact > 90) {
    return "S-";
  }
  if (impact > 85) {
    return "A+";
  }
  if (impact > 80) {
    return "A";
  }
  if (impact > 75) {
    return "A-";
  }
  if (impact > 70) {
    return "B+";
  }
  if (impact > 65) {
    return "B";
  }
  if (impact > 60) {
    return "B-";
  }
  if (impact > 55) {
    return "C+";
  }
  if (impact > 50) {
    return "C";
  }
  if (impact > 45) {
    return "C-";
  }
  if (impact > 40) {
    return "D+";
  }
  if (impact > 35) {
    return "D";
  }
  if (impact > 35) {
    return "D-";
  }
  if (impact > 30) {
    return "F+";
  }
  if (impact > 25) {
    return "F";
  }
  if (impact >= 20) {
    return "F-";
  } else {
    return "Error";
  }
}
