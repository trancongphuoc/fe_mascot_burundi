import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parameters = queryParams.get('parameters');

  return parameters;
};