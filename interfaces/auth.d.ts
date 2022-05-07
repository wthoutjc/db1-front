import { Hierarchy, Status } from "../enum";

export interface IAuth {
  status: {
    logged: boolean,
    date: number,
    hierarchy: Hierarchy | null,
  };
}
