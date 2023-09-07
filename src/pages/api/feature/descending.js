const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler(req, res) {
    const getData = async () => {
        var players = await supabase.from("players").select("*");
        players = players.data;
        var playerData = players.map((x) => getWinLoss(x.id));
        let data = Promise.allSettled(playerData).then((newData) => {
            let data = [];
            newData.map((player) => {
                data.push(player.value);
            });
            data.map(
                (player) =>
                (player.username = players.filter(
                    (player2) => player2.id == player.id
                )[0].username)
            );
            return data;
        });
        return data;
    };
    return new Promise((resolve, reject) => {
        getData()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Cache-Control", "max-age=180000");
                res.end(JSON.stringify(sortBySumOfProperties(response, 'wins', 'losses').slice(0, 3)));
                resolve();
            })
            .catch((error) => {
                res.json(error);
                res.status(405).end();
                resolve(); // in case something goes wrong in the catch block (as vijay commented)
            });
    });
}
// res.status(200).json();

async function getWinLoss(id) {
    var d = new Date();
    d.setDate(d.getDate() - 7);

    var matches = await supabase
        .from("matches")
        .select("start_time, match_data(match_id, player_id, winner)")
        .eq("match_data.player_id", id)
        .gte("start_time", Math.floor(d.valueOf() / 1000));
    matches = matches.data;
    matches = matches.filter((item) => item.match_data.length > 0);

    let allMatches = [];
    for (let index = 0; index < matches.length; index++) {
        let matchData = matches[index].match_data;
        for (let index2 = 0; index2 < matchData.length; index2++) {
            allMatches.push({
                match_id: matchData[index2].match_id,
                player_id: matchData[index2].player_id,
                winner: matchData[index2].winner,
                start_time: matches[index].start_time,
            });
        }
    }

    var player = { id: id, wins: 0, losses: 0 };

    player.wins = allMatches.filter((match) => match.winner).length;
    player.losses = allMatches.filter((match) => !match.winner).length;

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
