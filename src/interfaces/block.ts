import { BlockType } from "../enums/BlockType";

export interface IBlock {
  _id: string;
  type: BlockType;
  url?: string | null;
  heading?: string | null;
  paragraph?: string | null;
}
