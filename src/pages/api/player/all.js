const { createClient } = require("@supabase/supabase-js")
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler({ query: { id } }, res) {
    var player = await supabase.from("players").select("*").order('username')

    if (player.error !== null) {
        res.status(404).send({ message: `Player with id ${id} not found.`, status: 404 });
    } else {
        res.status(200).send(player.data)
    }
}
