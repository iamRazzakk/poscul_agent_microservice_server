import { Types } from "mongoose";
import { Role } from "../../enum/role";

export interface IMessage {
  conversation: Types.ObjectId;
  user: Types.ObjectId;
  role: Role;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
