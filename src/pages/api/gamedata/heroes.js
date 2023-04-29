import playerArray from "../../data/players";
import heroesJson from "../../data/heroes.json";

export default async function handler(req, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log("\x1b[32m   endpoint - \x1b[0m /api/gamedata/heroes");
  console.log("\x1b[31m   status - \x1b[0m 200");

  var heroes = [];
  for(let i = 0; i < heroesJson.length; i++) {
    heroes.push(heroesJson[i]);
  }

  if (heroes.length > 0) {
    console.log("\x1b[31m   status - \x1b[0m 200");
    res.status(200).json(heroes);
  } else {
    console.log("\x1b[31m   status - \x1b[0m 404");
    res.status(404).json({ message: `Heroes not returned from OpenDota API` });
  }
}
