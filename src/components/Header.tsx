import PrimaryText from "../assets/primary-text-3.svg";

import SVG from "react-inlinesvg";
import Rules from "../assets/rules.svg";
import Logout from "../assets/logout.svg";
// import { log } from "../utils/log";
import { useContext } from "react";
import { GameInfoContext } from "../store/game-info_context";
import { useTranslation } from 'react-i18next';
import '../utils/i18n'; // Import file cấu hình i18n

// interface HeaderProps {
//     gameNo?: number,
//     onClickRule: () => void
// }

const Header = function Header({ logout }: { logout: () => void }) {
  // log("<Header />");
  const { t } = useTranslation();
  const { noGame, setModal, stateGame } = useContext(GameInfoContext);

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
      <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
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

    </header>
  );
};

export default Header;
