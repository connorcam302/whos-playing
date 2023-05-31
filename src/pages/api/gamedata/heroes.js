import heroesJson from "../../../data/heroes.json";

// import { NextResponse } from 'next/server';

// export const runtime = 'experimental-edge';

export default async function handler(req, res) {
  let time = new Date();

  var heroes = [];
  for(let i = 0; i < heroesJson.length; i++) {
    heroes.push(heroesJson[i]);
  }

  if (heroes.length > 0) {
    res.status(200).json(heroes);
  } else {
    res.status(404).json({ message: `Heroes file not found` });
  }
}

// export default function MyEdgeFunction(request, context) {
//   let time = new Date();

//   var heroes = [];
//   for(let i = 0; i < heroesJson.length; i++) {
//     heroes.push(heroesJson[i]);
//   }

//   if (heroes.length > 0) {
//     return NextResponse.json(heroes)
//   } else {
//     return NextResponse.json({status: 404, message: `Heroes file not found`});
//   }
// }