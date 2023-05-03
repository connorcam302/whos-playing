const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler({ query: { id } }, res) {
  var heroesRaw = await supabase.from("match_data").select("hero_id");

  var uniqueHeroes = heroesRaw.data.reduce((unique, o) => {
    if (!unique.some((obj) => obj.hero_id === o.hero_id)) {
      unique.push(o);
    }
    return unique;
  }, []);

  var heroData = [];
  for (let index = 0; index < uniqueHeroes.length; index++) {
    var heroStats = await supabase.from("match_data").select("winner").eq("hero_id", uniqueHeroes[index].hero_id);
    heroData[index] = {
      hero_id: uniqueHeroes[index].hero_id,
      wins: heroStats.data.filter((x) => x.winner === true).length,
      losses: heroStats.data.filter((x) => x.winner === false).length,
    };
  }

  heroData = heroData.sort((a, b) => b.wins + b.losses - (a.wins + a.losses));

  res.status(200).send(heroData);
}
