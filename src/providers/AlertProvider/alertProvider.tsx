import { ReactNode, useCallback, useState } from "react";

import { AlertContext } from "../../utils/context";
import { AlertMode } from "../../enums";

interface AlertProviderProps {
  children: ReactNode;
}

export type Alert = {
  id: string;
  message: string;
  type: AlertMode;
};

export type AlertContextType = {
  alerts: Alert[];
  addAlert: (message: string, type: AlertMode) => void;
  removeAlert: (id: string) => void;
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((message: string, type: AlertMode) => {
    const id = Math.random().toString(36).substring(2, 9);
    setAlerts((prev) => [...prev, { id, message, type }]);

    const timer = setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  const removeAlert = useCallback((id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
