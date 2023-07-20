type ScoreWR = {
  [key: number]: {
    [key: string]: number;
  };
};
export const calculateScorePoints = (
  game: number,
  score: number,
  rank: string
) => {
  //target 1 000 000 000
  try {
    const multiplier = Number((1000000000 / scoreWR[game][rank]).toFixed(3));
    return (score * multiplier).toFixed().slice(0, 2);
  } catch (e) {
    return 0;
  }
};

// WR 20.07.2023
export const scoreWR: ScoreWR = {
  6: {
    Easy: 172044560,
    Normal: 366299400,
    Hard: 551876370,
    Lunatic: 777388190,
    Extra: 678104400,
  },
  7: {
    Easy: 2042271460,
    Normal: 2167768950,
    Hard: 2854468430,
    Lunatic: 4026942260,
    Extra: 1509003300,
    phantasm: 1710441020,
  },
  8: {
    Easy: 3379425090,
    Normal: 4496668100,
    Hard: 5242086820,
    Lunatic: 7017785890,
    Extra: 3178460830,
  },
  9: {
    Easy: 309939750,
    Normal: 638560680,
    Hard: 840343680,
    Lunatic: 749744450,
    Extra: 342570270,
  },
  10: {
    Easy: 1590048550,
    Normal: 1718140240,
    Hard: 2061506700,
    Lunatic: 2215297500,
    Extra: 1003229380,
  },
  11: {
    Easy: 771014960,
    Normal: 1228844210,
    Hard: 2168402810,
    Lunatic: 5255737110,
    Extra: 1126846180,
  },
  12: {
    Easy: 2168138790,
    Normal: 2950387290,
    Hard: 3267272190,
    Lunatic: 3616918520,
    Extra: 776144040,
  },
  128: {
    Easy: 43852610,
    Normal: 73788790,
    Hard: 89236060,
    Lunatic: 129733420,
    Extra: 102027380,
  },
  13: {
    Easy: 1050170540,
    Normal: 2087471200,
    Hard: 4042456790,
    Lunatic: 4120162760,
    Extra: 664795430,
  },
  14: {
    Easy: 1109424630,
    Normal: 1628148320,
    Hard: 1929988730,
    Lunatic: 2496080040,
    Extra: 1244867600,
  },
  15: {
    Easy: 1877770150,
    Normal: 3038789390,
    Hard: 3206264130,
    Lunatic: 3703001160,
    Extra: 1016971530,
  },
  16: {
    Easy: 2120013470,
    Normal: 5607183880,
    Hard: 7481981620,
    Lunatic: 9884713340,
    Extra: 3485097930,
  },
  17: {
    Easy: 4873546650,
    Normal: 7993478110,
    Hard: 10074017080,
    Lunatic: 12064857630,
    Extra: 2774430020,
  },
  18: {
    Easy: 1862188110,
    Normal: 6522829390,
    Hard: 10222409260,
    Lunatic: 14893827310,
    Extra: 7665770150,
  },
};
