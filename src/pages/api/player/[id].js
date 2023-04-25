import playerArray from "../../data/players";

export default function handler({query: {id}},res) {
    let time = new Date()
    console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`)
    console.log(`\x1b[32m   endpoint - \x1b[0m /api/player/${id}`)
    const filtered = playerArray.filter(player => player.id == id)

    if(filtered.length > 0) {
        console.log("\x1b[31m   status - \x1b[0m 200")
        res.status(200).json(filtered[0])
    } else {
        console.log("\x1b[31m   status - \x1b[0m 404")
        res.status(404).json({message:`Player with id ${id} not found.`})
    }
}