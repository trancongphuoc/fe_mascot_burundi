
type ModalState = "OPEN" | "CLOSE";
type ModalType = "RULE" |
                "BETTING" |
                "WINLOST" |
                "GAMEHISTORY" |
                "MYHISTORY" |
                "DEPOSIT" |
                "DISCONNECT" |
                "GAMERESULT";

interface ModalSet {
    state: ModalState,
    type: ModalType,
}