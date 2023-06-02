const images = [
  "leshrac.png",
  "misc10.png",
  "misc12.png",
  "misc13.png",
  "misc2.png",
  "misc7.png",
  "misc8.png",
  "misc9.png",
  "phantom_assassin.png",
  "shadow_shaman.png",
  "skywrath_mage.png",
  "sven.png",
  "templar_assassin.png",
];
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.resolve(
    ".",
    `public/heroes/${images[Math.floor(Math.random() * images.length)]}`
  );
  const imageBuffer = fs.readFileSync(filePath);
  if (images.length > 0) {
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  } else {
    res.status(404).json({ message: `No images found.` });
  }
}
