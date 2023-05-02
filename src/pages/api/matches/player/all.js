export default async function handler(req, res) {
  let time = new Date();
  let allMatches = [];
  var allPlayers = await fetchPlayers();

  for (let index = 0; index < allPlayers.length; index++) {
    await fetchUserData(allPlayers[index].id).then((matches) => {
      if(matches.status !== 404){
        allMatches = allMatches.concat(matches);
      }
    });
  }

  if (allMatches.length > 0) {
    var sortedMatches = allMatches.sort(
      ({ match_id: a }, { match_id: b }) => b - a
    );
    res.status(200).json(sortedMatches);
  } else {
    res.status(404).json({
      message: `No Matches Found.`,
    });
  }
}

async function fetchUserData(id) {
  try {
    const result = await fetch(process.env.BASEURL + `/matches/player/${id}`);
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchPlayers() {
  try {
    const result = await fetch(process.env.BASEURL + `/player/all`);
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
