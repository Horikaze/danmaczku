export const calculateScorePoints = (
  game: number,
  score: number,
  rank:string
) => {
  //target 1 000 000 000
  console.log(rank);

  switch (game) {
    case 6:
      //777,388,190
      score = score * 1.285;
      break;
    case 7:
      //4,026,942,260
      score = score * 0.249;
      break;
    case 8:
      //7,017,785,890
      score = score * 0.143;
      break;
    case 9:
      // 840,343,680
      score = score * 1.189;
      break;
    case 10:
      // 2,215,297,500
      score = score * 0.451;
      break;
    case 11:
      // 5,255,737,110
      score = score * 0.19;
      break;
    case 12:
      // 3,616,918,520
      score = score * 0.276;
      break;
    case 128:
      // 129,733,420
      score = score * 7.714;
      break;
    case 13:
      // 4,120,162,760
      score = score * 0.242;
      break;
    case 14:
      // 2,496,080,040
      score = score * 0.4;
      break;
    case 15:
      // 3,703,001,160
      score = score * 0.27;
      break;
    case 16:
      // 9,884,713,340
      score = score * 0.101;
      break;
    case 17:
      // 12,064,857,630
      score = score * 0.083;
      break;
    case 18:
      // 14,893,827,310
      score = score * 0.067;
      break;
    default:
      0;
      break;
  }
  return Number(score.toFixed().slice(0, 2));
};
