import { createContext } from "react";
import { AlertContextType } from "../providers/AlertProvider/alertProvider";
import { AlertMode } from "../enums";

export interface Alert {
  id: string;
  message: string;
  type: AlertMode;
}

const initialContext: AlertContextType = {
  alerts: [],
  addAlert: () => {},
  removeAlert: () => {},
};

export const AlertContext = createContext<AlertContextType>(initialContext);
