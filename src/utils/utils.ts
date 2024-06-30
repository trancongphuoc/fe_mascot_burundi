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