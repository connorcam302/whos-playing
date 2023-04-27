import playerArray from "../../../data/players";
const BASEURL = "http://localhost:3000/";
const VALVEURL = "https://api.steampowered.com/IDOTA2Match_205790/";
const VALVEKEY = "A72AAE412E7B080CF3D8E561BBBE949D";

export default async function handler(req, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log(
    "\x1b[32m   endpoint - \x1b[0m /api/matches/player/all"
  );
  console.log("\x1b[31m   status - \x1b[0m 200");
  let allMatches = [];
  for (const player of playerArray) {
    await fetchUserData(player.id).then((matches) => {
      allMatches = allMatches.concat(matches);
    });
  }

  if (allMatches.length > 0) {
    console.log("\x1b[31m   status - \x1b[0m 200");
    var sortedMatches = allMatches.sort(
      ({ start_time: a }, { start_time: b }) => b - a
    );
    res.status(200).json(sortedMatches);
  } else {
    console.log("\x1b[31m   status - \x1b[0m 404");
    res.status(404).json({
      message: `No Matches Found.`,
    });
  }
}

async function fetchUserData(id) {
  try {
    const result = await fetch(BASEURL + `/api/matches/player/${id}`);
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchMatchData(id) {
  try {
    const result = await fetch(
      BASEURL + `GetMatchDetails/v1?key=${VALVEKEY}&match_id=${id}`
    );
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}