import PrimaryText from "../assets/primary-text-3.svg";

import SVG from "react-inlinesvg";
import Rules from "../assets/rules-2.svg";
import Logout from "../assets/logout.svg";
import Ranking from "../assets/ranking.svg";
import Cancel from "../assets/cancel.svg";
// import { log } from "../utils/log";
import { useContext } from "react";
import { GameInfoContext } from "../store/game-info_context";
import { useTranslation } from 'react-i18next';
import '../utils/i18n'; // Import file cấu hình i18n

// interface HeaderProps {
//     gameNo?: number,
//     onClickRule: () => void
// }

const Header = function Header({ logout, openRanking, cancel }: { logout: () => void, openRanking: () => void, cancel: () => void }) {
  // log("<Header />");
  const { t } = useTranslation();
  const { noGame, setModal, stateGame, premium } = useContext(GameInfoContext);

  const handleOpenRule = () => {
    if (stateGame !== "RESULT" && stateGame !== "END") {
      setModal({ state: "OPEN", type: "RULE" });
    }
  };

  return (
    <header className="section-header u-margin-top-huge1">
      {/* <SVG
        src={Rule}
        className="section-header__logout"
        onClick={handleOpenRule}
      /> */}
      <SVG src={PrimaryText} className="u-margin-minus-bottom-big" />
      <p className="heading-secondary">{t("Today {{count}} games", { count: noGame || 0 })}</p>
      <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "5px", alignItems: "center"}}>
        <SVG
          src={Logout}
          className="section-header__logout"
          onClick={logout}
        />
        <SVG
          src={Rules}
          className="section-header__rule"
          onClick={handleOpenRule}
        />
      </div>

      <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "5px", alignItems: "center"}}>
        <SVG
            src={Ranking}
            className="section-header__logout"
            onClick={openRanking}
          /> 
        {premium === true && 
          <SVG
            style={{marginTop: 5}}
            src={Cancel}
            className="section-header__rule"
            onClick={cancel}
          />}
      
      </div>



    </header>
  );
};

export default Header;
