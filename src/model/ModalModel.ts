
type ModalState = "OPEN" | "CLOSE";
type ModalType = "RULE" |
                "BETTING" |
                "WINLOST" |
                "GAMEHISTORY" |
                "MYHISTORY" |
                "DEPOSIT" |
                "DISCONNECT" |
                "GAMECIRCLE" |
                "GAMERESULT" |
                "MAINTAIN";

interface ModalSet {
    state: ModalState,
    type: ModalType,
}