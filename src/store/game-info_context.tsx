import { createContext } from "react";

type GameInfoContextType = {
    stateGame: StatusGame;
    transactionId: number;
    noGame: number;
    cardResult: ZodiacCard | null;
    setModal: (_state: ModalSet) => void;
    selectedCard: BetZodiacCard | null;
    setSelectedCard: (_card: ZodiacCardModel) => void;
    betting: (_card: BetZodiacCard) => void;
    
};


export const GameInfoContext = createContext<GameInfoContextType>({
    stateGame: "NONE",
    transactionId: 0,
    noGame: 0,
    cardResult: null,
    setModal: (_state : ModalSet) => {},
    selectedCard: null,
    setSelectedCard: (_card: ZodiacCardModel) => {},
    betting: (_card: BetZodiacCard) => {}
});
