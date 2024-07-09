import { createContext } from "react";

export const GameInfoContext = createContext({
    stateGame: "NONE",
    transactionId: 0,
    noGame: 0,
    setGameHistory: (state : modalState) => {},
    setRule: (state : modalState) => {},
    setMyGameHistory: (state : modalState) => {},
});
