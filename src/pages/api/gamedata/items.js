import itemsJson from "../../data/items.json";

export default async function handler(req, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log("\x1b[32m   endpoint - \x1b[0m /api/gamedata/items");
  console.log("\x1b[31m   status - \x1b[0m 200");

  var items = []
  for(let i = 0; i < itemsJson.length; i++) {
    items.push(itemsJson[i]);
  }

  items.push({ id: 0, img: null, hint: "Empty item slot." });
  if (items.length > 0) {
    console.log("\x1b[31m   status - \x1b[0m 200");
    res.status(200).json(items);
  } else {
    console.log("\x1b[31m   status - \x1b[0m 404");
    res.status(404).json({ message: `Items file not found.` });
  }
}