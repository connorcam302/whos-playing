import { React, useEffect, useState } from "react";
import AllMatchCard from "./AllMatchCard";

const GetMatchHelper = (props) => {
  const [matches, setMatches] = useState([]);

  const BASEURL = "https://api.opendota.com/api/";

  const getMatches = () => {
    fetch(BASEURL + "players/229886086/matches?date=90")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMatches();
  }, []);

  console.log(matches)
  return (
    <>
      {matches!==[] && <AllMatchCard matches={matches} />}
    </>
  );
};
export default GetMatchHelper;
