import { Model } from "mongoose";
import { USER_ROLES } from "../../../enums/user";
// Authentication related (OTP, password reset)
// Main User interface
export type IUser = {
  name: string;
  role: USER_ROLES;
  contact: string;
  email: string;
  password: string;
  location: string;
  profile: string;
  verified: boolean;
  isBanned: boolean;
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isAccountCreated(id: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
