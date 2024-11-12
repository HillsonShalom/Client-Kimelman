import { ICandidate } from "./ICand";

export interface IUser {
    username: string;
    age: number;
    hasVoted?: boolean;
    votedFor?: ICandidate | null;
}