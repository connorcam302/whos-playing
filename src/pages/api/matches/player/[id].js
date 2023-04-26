import playerArray from "../../../data/players";

const OPENDOTA_URL = "https://api.opendota.com/api/";
const BASEURL = "http://localhost:3000/api/"

export default async function handler({ query: { id } }, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log(
    `\x1b[32m   endpoint - \x1b[0m /api/matches/player/${id}`
  );
  const filtered = playerArray.filter((player) => player.id == id);
  var heroData;
  await fetchHeroData().then(heroes => heroData = heroes)
  await fetchUserData(filtered[0].id).then((matches) => {
    function dateString(epoch) {
      let date = new Date(epoch * 1000).getDate().toString();
      let month = new Date(epoch * 1000).toLocaleString("default", {
        month: "long",
      });
      let year = new Date(epoch * 1000).getFullYear();

      function getSuffix(i) {
        var j = i % 10,
          k = i % 100;
        if (j == 1 && k != 11) {
          return i + "st";
        }
        if (j == 2 && k != 12) {
          return i + "nd";
        }
        if (j == 3 && k != 13) {
          return i + "rd";
        }
        return i + "th";
      }

      return `${getSuffix(date)} ${month} ${year}`
    }
    console.log(heroData)
    matches.map((match) => (match.hero = heroData.find(hero => hero.id == match.hero_id)))
    matches.map((match) => (match.player = filtered[0]));
    matches.map((match) => (match.date_string = dateString(match.start_time)));

    if (filtered.length > 0) {
      console.log("\x1b[31m   status - \x1b[0m 200");
      res.status(200).json(matches);
    } else {
      console.log("\x1b[31m   status - \x1b[0m 404");
      res
        .status(404)
        .json({
          message: `Matches for player with id ${id} not found.`,
        });
    }
  });
}

async function fetchUserData(id) {
  try {
    const result = await fetch(
      OPENDOTA_URL + "players/" + id + "/matches?date=90",
      {
        method: "GET",
      }
    );

    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchHeroData(id) {
  try {
    const result = await fetch(
      BASEURL + "hero/all",
      {
        method: "GET",
      }
    );

    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
