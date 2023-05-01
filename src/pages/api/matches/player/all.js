export default async function handler(req, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log(
    "\x1b[32m   endpoint - \x1b[0m /api/matches/player/all"
  );
  console.log("\x1b[31m   status - \x1b[0m 200");
  let allMatches = [];
  var allPlayers = await fetchPlayers();

  for (let index = 0; index < allPlayers.length; index++) {
    await fetchUserData(allPlayers[index].id).then((matches) => {
      if(matches.status !== 404){
        console.log(allPlayers[index].username)
        allMatches = allMatches.concat(matches);
      }
    });
  }

  if (allMatches.length > 0) {
    console.log("\x1b[31m   status - \x1b[0m 200");
    var sortedMatches = allMatches.sort(
      ({ match_id: a }, { match_id: b }) => b - a
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
    const result = await fetch(process.env.BASEURL + `/api/matches/player/${id}`);
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchPlayers() {
  try {
    const result = await fetch(process.env.BASEURL + `/api/player/all`);
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
