import itemsJson from "../../../data/items.json";

export default async function handler(req, res) {
  let time = new Date();

  var items = []
  for(let i = 0; i < itemsJson.length; i++) {
    items.push(itemsJson[i]);
  }

  items.push({ id: 0, img: null, hint: "Empty item slot." });
  if (items.length > 0) {
    res.status(200).json(items);
  } else {
    res.status(404).json({ message: `Items file not found.` });
  }
}