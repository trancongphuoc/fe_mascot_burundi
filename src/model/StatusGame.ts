type StatusGame = 'NONE' | 'PREPARESTART' | 'COUNTDOWN' | 'RESULTWAITING' | 'RESULT' | 'END';

interface GameInfo {
    stateGame : StatusGame,
    transactionId: number,
  }