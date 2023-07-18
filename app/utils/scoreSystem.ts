export const calculateScorePoints = (game: number, score: number) => {
  switch (game) {
    case 6:
      //777,388,190
      return score * 1.28507;
    case 7:
      //4,026,942,260
      return score * 0.248529;
    case 8:
      //7,017,785,890
      return score * 0.14251;
    case 9:
      // 840,343,680
      return score * 1.18921;
    case 10:
      // 2,215,297,500
      return score * 0.45116;
    case 11:
      // 5,255,737,110
      return score * 0.19017;
    case 12:
      // 3,616,918,520
      return score * 0.27608;
    case 128:
      // 129,733,420
      return score * 7.71428;
    case 13:
      // 4,120,162,760
      return score * 0.24236;
    case 14:
      // 2,496,080,040
      return score * 0.40005;
    case 15:
      // 3,703,001,160
      return score * 0.27029;
    case 16:
      // 9,884,713,340
      return score * 0.10118;
    case 17:
      // 12,064,857,630
      return score * 0.08288;
    case 18:
      // 14,893,827,310
      return score * 0.06712;
    default:
      return 0;
  }
};
