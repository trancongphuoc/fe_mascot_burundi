import { memo, useContext } from "react";
import SVG from "react-inlinesvg";
import { GameInfoContext } from "../../store/game-info_context";
import { log } from "../../utils/log";

interface NoGameTodayProps {
  arrowImg: string;
  noGameToday: number;
}

const NoGameToday = memo(function NoGameToday({
  arrowImg,
  noGameToday,
}: NoGameTodayProps) {
  log("<NoGameToday />");

  const { setModal, stateGame } = useContext(GameInfoContext);

  const handleOpenMyHitory = () => {
    if (stateGame !== "RESULT" && stateGame !== "END") {
      setModal({ state: "OPEN", type: "MYHISTORY" });
    }
  };

  return (
    <div onClick={handleOpenMyHitory} className="header-right">
      <p className="header-right--text">Số lần đoán hôm nay: {noGameToday}</p>
      <SVG className="header-right--arrow" src={arrowImg} />
    </div>
  );
});

export default NoGameToday;
