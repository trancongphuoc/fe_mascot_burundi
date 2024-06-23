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