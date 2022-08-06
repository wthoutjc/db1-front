// Interfaces
import { INotification } from "./";

export interface UI {
  notifications: INotification[];
  sidebar: {
    open: boolean;
  };
}
