import { React } from "react";
import MatchCard from "./MatchCard";
import { Box, Center, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import MatchRow from "./MatchRow";

function AllMatchCard(props) {
  var displayCard = props.card
  const newCard = (match) => {
    if(displayCard) {
      return (
        <WrapItem>
          <MatchCard match={match} key={match.player_id + "-" + match.match_id} />
        </WrapItem>
      )} else {
        return (
          <MatchRow match={match} key={match.player_id + "-" + match.match_id}></MatchRow>
        )
      }
  };
  
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

async function fetchHeroData() {
  try {
    const result = await fetch(
      `https://raw.githubusercontent.com/odota/dotaconstants/master/build/heroes.json`
    );
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}