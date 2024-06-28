import { useState, useEffect } from 'react';

const useNetworkStatus = (): string | null => {
  const [effectiveType, setEffectiveType] = useState<string | null>(null);

  useEffect(() => {
    const navigatorConnection = (navigator as any).connection;

    const updateNetworkStatus = () => {
      if (navigatorConnection) {
        setEffectiveType(navigatorConnection.effectiveType);
      }
    };

    updateNetworkStatus();

    if (navigatorConnection) {
      navigatorConnection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      if (navigatorConnection) {
        navigatorConnection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return effectiveType;
};

export default useNetworkStatus;
