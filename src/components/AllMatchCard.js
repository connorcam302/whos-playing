import { React } from "react";
import MatchCard from "./MatchCard";

const newCard = (match) => {
  return (<MatchCard
      match={match.match_id}
    />
  );
};
function AllMatchCard(props) {
  return <div className="all-cards">{props.matches.map(newCard)}</div>;
}
export default AllMatchCard;
