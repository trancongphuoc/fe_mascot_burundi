type StatusGame = 'NONE' | 'PREPARESTART' | 'COUNTDOWN' | 'RESULTWAITING' | 'RESULT' | 'END' | 'NONE';

interface GameInfo {
    stateGame : StatusGame,
    transactionId: number,
  }