import { Status } from "../enums/Status";
import { IBlock } from "./block";
import { IUser } from "./user";

export interface IContent {
  _id: string;
  title: string;
  blocks: IBlock[];
  createdBy: IUser;
  updatedBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}
