import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';

interface PopupPrepareRegisterProps {
    phoneNumber: string;
    callback: any;
    type: string
}

const PopupPrepareRegister: React.FC<PopupPrepareRegisterProps> = ({ phoneNumber, callback, type }) => {
    const { setModal } = useContext(GameInfoContext);

    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "MPS_INPUTPHONE" })}
            classNameChild='mps'
        >
            <div className='mps-chill'>
                <div style={{ marginBottom: 30, textAlign: 'center' }}>
                    <h2>{'Hello ' + phoneNumber}</h2>
                </div>
                <div style={{ marginBottom: 30, textAlign: 'center' }}>
                    <p style={{ wordWrap: 'break-word' }}>
                        <strong>
                            {type === "REGISTER" ?
                            "Fee 120Fbu/1000 ibiceri/umunsi Join to MASCOT now for a chance to win 500.000 Fbu every month" :
                            "Are you sure ?"}
                            
                        </strong>
                    </p>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",

                }}>
                    <button className='mps-button' onClick={callback}>{type === "REGISTER" ? "REGISTER" : "CANCEL"}</button>
                </div>

            </div>
        </PopupCenter>
    );
};

export default PopupPrepareRegister;
