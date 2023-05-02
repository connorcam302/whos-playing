import heroesJson from "../../data/heroes.json";

export default async function handler(req, res) {
  let time = new Date();

  var heroes = [];
  for(let i = 0; i < heroesJson.length; i++) {
    heroes.push(heroesJson[i]);
  }

  if (heroes.length > 0) {
    res.status(200).json(heroes);
  } else {
    res.status(404).json({ message: `Heroes file not found` });
  }
}
