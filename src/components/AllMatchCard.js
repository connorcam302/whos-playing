import { React } from "react";
import MatchCard from "./MatchCard";
import { Box, Center, Flex, Wrap, WrapItem } from "@chakra-ui/react";


const newCard = (match) => {
  return (
    <WrapItem>
      <MatchCard match={match} key={match.player.id + "-" + match.match_id} />
    </WrapItem>
  );
};
function AllMatchCard(props) {
  return (
      <Wrap maxWidth="62em" justify="center" className="all-cards">{props.matches.map(newCard)}</Wrap>
  );
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