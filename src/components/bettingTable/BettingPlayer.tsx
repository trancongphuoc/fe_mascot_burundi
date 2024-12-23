interface BettingPLayersProps {
    numberOfPlayer: number
}
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n
export default function BettingPLayers ({numberOfPlayer}: BettingPLayersProps) {
    const { t } = useTranslation();

    return (
        <p className='betting-table__card--players'>{numberOfPlayer} {t("Person")}</p>
    )
}