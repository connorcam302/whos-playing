export default async function handler({ query: { page } }, res) {
  let time = new Date();
  let allMatches = [];
  var allPlayers = await fetchPlayers();

  if(page === undefined){
    page = 0;
  }

  for (let index = 0; index < allPlayers.length; index++) {
    await fetchUserData(allPlayers[index].id).then((matches) => {
      if(matches.status !== 404){
        allMatches = allMatches.concat(matches);
      }
    });
  }

  console.log(page)
  if (allMatches.length > 0) {
    var sortedMatches = allMatches.sort(
      ({ match_id: a }, { match_id: b }) => b - a
    );
    let cutMatches = sortedMatches.slice(page*20,((page*20)+19))
    res.status(200).json(cutMatches);
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
