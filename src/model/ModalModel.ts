
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
                "MAINTAIN" |
                "MPS_INPUTPHONE" |
                "SENDOTP" |
                "VERIFYOTP" |
                "REGISTERANDCANCEL" |
                "NOTIFY" |
                "TOPDAILY" |
                "TOPMONTHLY" |
                "SHOWIFRAME";

interface ModalSet {
    state: ModalState,
    type: ModalType,
}