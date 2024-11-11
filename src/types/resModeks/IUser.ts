import { ICandidate } from "./ICand";

export interface IUser {
    username: string;
    password: string;
    age: number;
    hasVoted?: boolean;
    isAdmin?: boolean;
    votedFor?: ICandidate | null;
}