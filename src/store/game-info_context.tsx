import { createContext } from "react";


type GameInfoContextType = {
    stateGame: StatusGame;
    transactionId: number;
    noGame: number;
    cardResult: ZodiacCard | null;
    selectedCard: BetZodiacCard | null;
    topUsers: User[];
    setModal: (_state: ModalSet) => void;
    setSelectedCard: (_card: ZodiacCardModel) => void;
    betting: (_card: BetZodiacCard) => void;
};


export const GameInfoContext = createContext<GameInfoContextType>({
    stateGame: "NONE",
    transactionId: 0,
    noGame: 0,
    cardResult: null,
    topUsers: [],
    setModal: (_state : ModalSet) => {},
    selectedCard: null,
    setSelectedCard: (_card: ZodiacCardModel) => {},
    betting: (_card: BetZodiacCard) => {}
});

// interface GameInfoProviderProps {
//     children: ReactNode,
// }
