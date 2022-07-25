// Interfaces
import { INotification } from "./";

type ConnectionStatus = Status.connected | Status.disconnected;

export interface UI {
  notifications: INotification[];
}
