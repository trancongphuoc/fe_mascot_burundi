import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parameters = queryParams.get('parameters');

  return parameters;
};

export const formatNumber = (num: number) => {
    if (num >= 1000000) {
        const formattedNum = (num / 1000).toFixed(0).replace('.', ',');
        return parseFloat(formattedNum).toLocaleString('vi-VN') + 'k';
    } else {
        return num.toLocaleString('vi-VN');
    }
};

export function isSameDay(timestamp1: number, timestamp2: number): boolean {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
}