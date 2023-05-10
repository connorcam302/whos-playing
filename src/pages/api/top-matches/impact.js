var matches = [
  {
    id: 690334,
    player_id: 294548916,
    match_id: 7147379737,
    hero_id: 128,
    winner: true,
    kills: 2,
    deaths: 13,
    assists: 14,
    party_size: null,
    aghanims_scepter: 0,
    aghanims_shard: 1,
    gold_per_min: 306,
    last_hits: 60,
    xp_per_min: 317,
    start_time: 1683671151,
    rank: null,
    duration: 2756,
    username: "Colfox",
  },
  {
    id: 685742,
    player_id: 294548916,
    match_id: 7147353329,
    hero_id: 62,
    winner: true,
    kills: 0,
    deaths: 14,
    assists: 32,
    party_size: null,
    aghanims_scepter: 0,
    aghanims_shard: 0,
    gold_per_min: 381,
    last_hits: 20,
    xp_per_min: 371,
    start_time: 1683668535,
    rank: null,
    duration: 47*60,
    username: "Colfox",
    hero: {},
    items: [],
  },
  {
    id: 682957,
    player_id: 294548916,
    match_id: 7147323143,
    hero_id: 13,
    winner: true,
    kills: 20,
    deaths: 3,
    assists: 14,
    party_size: null,
    aghanims_scepter: 0,
    aghanims_shard: 0,
    gold_per_min: 475,
    last_hits: 142,
    xp_per_min: 549,
    start_time: 1683666187,
    rank: null,
    duration: 1923,
    username: "Colfox",
    hero: {},
    items: [],
  },
];

const impactCalc = (match) => {
  var csMin = match.last_hits / (match.duration / 60);
  var role = csMin > 3.5 ? "core" : "support";
  if (role === "core") {
    var kapmRating = ((match.kills * 2.5 + match.assists * 0.5) / (match.duration / 60)) ** 2;
    var deathRating = 3 / (match.deaths + 1);
    var csMinRating = csMin ** 1.5 / 20;
    var impact = kapmRating * 0.4 + deathRating * 0.4 + csMinRating * 0.2;
  } else {
    var kapmRating = ((match.kills + match.assists * 1.65) / (match.duration / 60)) ** 2;
    var deathRating = 5 / (match.deaths + 1.5);
    var impact = kapmRating * 0.4 + deathRating * 0.6;
  }
  return Math.floor(impact * 100) ;
};

console.log(matches.map((match) => impactCalc(match)));