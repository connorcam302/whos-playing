const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler(req, res) {
    const getData = async () => {
        let players = await supabase.from("players").select("*");
        players = players.data;
        let playerWinLoss = await Promise.all(players.map((x) => getWinLoss(x.id)));
        let playerData = playerWinLoss.map((winLoss, index) => ({
            ...winLoss,
            ...players[index]
        }))
        return playerData;
    };

    return new Promise((resolve, reject) => {
        getData()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Cache-Control", "max-age=180000");
                res.end(
                    JSON.stringify(
                        sortBySumOfProperties(response, "wins", "losses")
                            .reverse()
                            .slice(0, 3)
                    )
                );
                resolve();
            })
            .catch((error) => {
                res.json(error);
                res.status(405).end();
                resolve(); // in case something goes wrong in the catch block (as vijay commented)
            });
    });
}

async function getWinLoss(id) {
    var d = new Date();
    d.setDate(d.getDate() - 7);

    const wins = await supabase
        .from("match_data")
        .select("player_id, winner, matches!inner(start_time)")
        .match({ player_id: id, winner: true })
        .gte("matches.start_time", Math.floor(d.valueOf() / 1000))

    const losses = await supabase
        .from("match_data")
        .select("player_id, winner, matches!inner(start_time)")
        .match({ player_id: id, winner: false })
        .gte("matches.start_time", Math.floor(d.valueOf() / 1000))

    let player = { id: id, wins: wins.data.length, losses: losses.data.length }

    return player;
}

function sortBySumOfProperties(arr, prop1, prop2) {
    return arr.sort((a, b) => {
        const sumA = a[prop1] - a[prop2];
        const sumB = b[prop1] - b[prop2];

        if (sumA < sumB) {
            return -1; // a should come before b
        } else if (sumA > sumB) {
            return 1; // b should come before a
        } else {
            return 0; // sums are equal
        }
    });
}
