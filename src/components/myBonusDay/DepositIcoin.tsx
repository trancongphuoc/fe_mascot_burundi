import ArrowWhite from "../../assets/arrow-white.svg";
import SVG from "react-inlinesvg";
import { callbackFlutter } from "../../utils/functions";
// import { log } from "../../utils/log";
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n
export default function DepositIcoin({ handleCharge }: { handleCharge: () => void }) {
  // log("<DepositIcoin />");
  const { t } = useTranslation();
  return (
    <button
      className="end-right"
      // onClick={() => callbackFlutter("callbackMyWallet")}
      onClick={handleCharge}
    >
      <p className="end-right--text">{t("Buy more")}</p>
      <SVG src={ArrowWhite} className="end-right--img" />
    </button>
  );
}