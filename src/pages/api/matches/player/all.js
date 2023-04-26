import playerArray from "../../../data/players";
const BASEURL = "http://localhost:3000/"

export default async function handler(req, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log("\x1b[32m   endpoint - \x1b[0m /api/player/all");
  console.log("\x1b[31m   status - \x1b[0m 200");
  let allMatches = [];
  for(const player of playerArray){
    await fetchUserData(player.id).then((matches) => {
        allMatches = allMatches.concat(matches)
    })
  }
  if (allMatches.length > 0) {
    console.log("\x1b[31m   status - \x1b[0m 200");
    var sortedMatches = allMatches.sort(({start_time:a}, {start_time:b}) => b-a)
    res.status(200).json(sortedMatches);
  } else {
    console.log("\x1b[31m   status - \x1b[0m 404");
    res
      .status(404)
      .json({
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
