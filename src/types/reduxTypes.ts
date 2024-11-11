import { ICandidate } from "./resModeks/ICand";
import { IUser } from "./resModeks/IUser";

export enum DataStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface userState {
  error: string | null;
  status: DataStatus;
  user: IUser | null;
}

export interface candidatesState {
  error: string | null;
  status: DataStatus;
  candidates: ICandidate[];
}
