import { Hierarchy } from "../enum";

export interface IAuth {
  logged?: boolean;
  id: string;
  name: string;
  hierarchy: Hierarchy | null;
}
