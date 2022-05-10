// Interfaces
import { INotification } from "./";

type ConnectionStatus = Status.connected | Status.disconnected;

type HierarchyType =
  | Hierarchy.admin
  | Hierarchy.client
  | Hierarchy.employee
  | null;

export interface UI {
  notifications: INotification[];
}
