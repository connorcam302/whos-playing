const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);
import heroesJson from "../../../data/heroes.json";

const dotenv = require("dotenv");
dotenv.config();

export default async function handler({ query: { days, limit, player } }, res) {
    if (!days > 0) days = 999;
    var d = new Date();
    d.setDate(d.getDate() - days);

    var heroes = [];
    for (let i = 0; i < heroesJson.length; i++) {
        heroes.push({ hero_id: heroesJson[i].id, name: heroesJson[i].localized_name, img: heroesJson[i].img, wins: 0, losses: 0 });
    }

    var matches = await supabase
        .from("matches")
        .select("start_time, match_data(player_id, hero_id, winner, impact)")
        .gte("start_time", Math.floor(d.valueOf() / 1000));
    matches = matches.data;

    matches = matches.filter((item) => item.match_data.length > 0);

    let allMatches = [];
    for (let index = 0; index < matches.length; index++) {
        let matchData = matches[index].match_data;
        for (let index2 = 0; index2 < matchData.length; index2++) {
            allMatches.push({
                hero_id: matchData[index2].hero_id,
                winner: matchData[index2].winner,
                player: matchData[index2].player_id,
                impact: matchData[index2].impact,
                start_time: matches[index].start_time,
            });
        }
    }

    if (player !== undefined) {
        allMatches = allMatches.filter((match) => match.player == player);
    }


    for (let index = 0; index < heroes.length; index++) {
        heroes[index].wins = allMatches.filter((match) => match.hero_id === heroes[index].hero_id && match.winner).length;
        heroes[index].losses = allMatches.filter((match) => match.hero_id === heroes[index].hero_id && !match.winner).length
        heroes[index].impact = allMatches.filter((match) => match.hero_id === heroes[index].hero_id).reduce((sum, match) => sum + match.impact, 0) / allMatches.filter((match) => match.hero_id === heroes[index].hero_id).length;
    }

    heroes = heroes.sort((a, b) => b.wins + b.losses - (a.wins + a.losses));

    if (limit > 0) {
        heroes = heroes.slice(0, limit)
    }

    res.status(200).send(heroes);
}
