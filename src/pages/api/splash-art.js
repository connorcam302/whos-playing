const images = [
  "abaddon.png",
  "alchemist.png",
  "anti_mage.png",
  "arc_warden.png",
  "axe.png",
  "bane.png",
  "beastmaster.png",
  "bloodseeker.png",
  "bounty_hunter.png",
  "brewmaster.png",
  "bristleback.png",
  "centaur_warunner.png",
  "clinkz.png",
  "clockwerk.png",
  "crystal_maiden.png",
  "dazzle.png",
  "death_prophet.png",
  "disruptor.png",
  "doom.png",
  "dragon_knight.png",
  "drow_ranger.png",
  "earthshaker.png",
  "earth_spirit.png",
  "elder_titan.png",
  "ember_spirit.png",
  "faceless_void.png",
  "gyrocopter.png",
  "huskar.png",
  "invoker.png",
  "juggernaut.png",
  "keeper_of_the_light.png",
  "legion_commander.png",
  "leshrac.png",
  "lich.png",
  "lifestealer.png",
  "lina.png",
  "lion.png",
  "lone_druid.png",
  "luna.png",
  "lycan.png",
  "magnus.png",
  "medusa.png",
  "meepo.png",
  "mirana.png",
  "misc1.png",
  "misc2.png",
  "misc3.png",
  "misc4.png",
  "misc5.png",
  "misc6.png",
  "misc7.png",
  "misc8.png",
  "misc9.png",
  "misc10.png",
  "misc11.png",
  "misc12.png",
  "misc12.png",
  "morphling.png",
  "naga_siren.png",
  "natures_prophet.png",
  "necrophos.png",
  "nyx_assassin.png",
  "ogre_magi.png",
  "omniknight.png",
  "outworld_devourer.png",
  "phantom_assassin.png",
  "phantom_lancer.png",
  "phoenix.png",
  "puck.png",
  "pudge.png",
  "queen_of_pain.png",
  "razor.png",
  "riki.png",
  "rubick.png",
  "sand_king.png",
  "shadow_demon.png",
  "shadow_fiend.png",
  "shadow_shaman.png",
  "silencer.png",
  "skywrath_mage.png",
  "slardar.png",
  "slark.png",
  "sniper.png",
  "spectre.png",
  "spirit_breaker.png",
  "storm_spirit.png",
  "sven.png",
  "techies.png",
  "templar_assassin.png",
  "terroblade.png",
  "tidehunter.png",
  "timbersaw.png",
  "tinker.png",
  "tiny.png",
  "treant_protector.png",
  "tusk.png",
  "user.png",
  "vengeful_spirit.png",
  "venomancer.png",
  "visage.png",
  "warlock.png",
  "windranger.png",
  "wisp.png",
  "witch_doctor.png",
  "wraith_king.png",
  "wyvern.png",
  "yearbeast.png",
  "zeus.png",
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
    // res.setHeader("Content-Type", "image/png");
    // res.send(imageBuffer);
    res.status(200).json(images[Math.floor(Math.random() * images.length)])
  } else {
    res.status(404).json({ message: `No images found.` });
  }
}
