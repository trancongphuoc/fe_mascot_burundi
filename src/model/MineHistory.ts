interface BetInfo {
    time: Date;
    bettings: CardBet[];
    totalIcoin: number;
  }
  
  interface CardBet {
    zodiac: string;
    bonus: string;
    icoin: number;
  }

  interface MyHistory {
    time: Date,
    noGame: number,
    totalIcoinWin: number,
    totalIcoinBetting: number,
    zodiacCardId: string,
    zodiacCards: BetZodiacCard[],
    netIcoin: number,
  }