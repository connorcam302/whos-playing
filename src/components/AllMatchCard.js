import { React } from "react";
import MatchCard from "./MatchCard";
import { Box, Center, Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import MatchRow from "./MatchRow";

function AllMatchCard(props) {
  var displayCard = props.card
  const newCard = (match) => {
    if(displayCard) {
      return (
        <WrapItem key={match.player_id + "-" + match.match_id}>
          <MatchCard match={match}  />
        </WrapItem>
      )} else {
        return (
          <MatchRow match={match} key={match.player_id + "-" + match.match_id}></MatchRow>
        )
      }
  };
  if(props.matches.status == 404) return (
    <Center w={"54em"}>
      <Heading>No matches found.</Heading>
    </Center>
  )
  
  if(displayCard) {
  return (
      <Wrap maxWidth="62em" justify="center" className="all-cards">{props.matches.map(newCard)}</Wrap>
  );} else {
    return (
      <Box>{props.matches.map(newCard)}</Box>
    )
  }
}
export default AllMatchCard;