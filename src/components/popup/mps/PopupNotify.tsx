import { useEffect, useState, useContext } from 'react';
import PopupCenter from '../PopupCenter';
import { GameInfoContext } from '../../../store/game-info_context';

interface PopupNotifyProps {
    _title: string;
    _message: string;
    _buttonName: string
    callback: any;
}

const PopupNotify: React.FC<PopupNotifyProps> = ({_title, _message, _buttonName, callback}) => {
    const { setModal } = useContext(GameInfoContext);

    return (
        <PopupCenter
            className='popup-overlay-history'
            onClick={() => setModal({ state: "CLOSE", type: "MPS_INPUTPHONE" })}
            classNameChild='mps'
        >
            <div className='mps-chill'>
                <div style={{marginBottom: 30, textAlign: 'center'}}>
                    <h2>{_title}</h2>
                </div>
                <div style={{marginBottom: 30, textAlign: 'center'}}>
                    <p style={{wordWrap: 'break-word'}}><strong>{_message}</strong></p>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                    
                }}>
                    <button className='mps-button' onClick={callback}>{_buttonName}</button>
                </div>
            
            </div>
        </PopupCenter>
    );
};

export default PopupNotify;
