import playerArray from "../../data/players";

const OPENDOTA_URL = "https://api.opendota.com/api/"

export default async function handler(req, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log("\x1b[32m   endpoint - \x1b[0m /api/gamedata/items");
  console.log("\x1b[31m   status - \x1b[0m 200");

  await fetchItemData().then(itemsJSON => {
    var items = []
    for(var i in itemsJSON){
      items.push(itemsJSON[i]);
    }

    items.map(item => {
      let itemId = item.img.slice(36,item.img.indexOf("."))
      item.img = `https://cdn.dota2.com/apps/dota2/images/items/${itemId}_lg.png`
    })
    items.push({id: 0, img: null, hint: "Empty item slot."})
    if (items.length > 0) {
      console.log("\x1b[31m   status - \x1b[0m 200");
      res.status(200).json(items);
    } else {
      console.log("\x1b[31m   status - \x1b[0m 404");
      res
        .status(404)
        .json({ message: `Items not returned from OpenDota API` });
    }
  })
}

async function fetchItemData() {
  try {
    const result = await fetch(
      `https://raw.githubusercontent.com/odota/dotaconstants/master/build/items.json`
    );
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
