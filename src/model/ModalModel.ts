
type ModalState = "OPEN" | "CLOSE";
type ModalType = "RULE" |
                "BETTING" |
                "WINLOST" |
                "GAMEHISTORY" |
                "MYHISTORY" |
                "DEPOSIT" |
                "DISCONNECT" |
                "GAMECIRCLE" |
                "GAMERESULT";

interface ModalSet {
    state: ModalState,
    type: ModalType,
}