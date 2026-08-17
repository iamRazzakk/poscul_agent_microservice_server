import { IFileInfo } from "./file.interface";
import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { FileInfo } from "./file.model";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { RedisService } from "../../redis/redis.service";
import { Conversation } from "../Conversation/conversation.model";

// create file into db
const createFileIntoDB = async (payload: IFileInfo, user: JwtPayload) => {
  payload.user = new Types.ObjectId(user.id);
  const fileInfo = await FileInfo.create(payload);
  if (!fileInfo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create file info");
  }
  await RedisService.setRedis({
    key: `file:${user.id}`,
    value: JSON.stringify(fileInfo),
    expiration: 60 * 60 * 24, // 24 hours
  });
  return fileInfo;
};

// update file into db
const updateFileIntoDB = async (id: string, payload: IFileInfo) => {
  console.log("payload", payload);
  const fileInfo = await FileInfo.findByIdAndUpdate(id, payload, { new: true });
  if (!fileInfo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update file info");
  }

  await RedisService.deleteRedis(`file:${fileInfo.user}`);
  return fileInfo;
};

// get all files from db
const getAllFilesFromDB = async (user: JwtPayload) => {
  const catchData = await RedisService.getRedis(`file:${user.id}`);
  if (catchData) {
    console.log("from cache");
    return JSON.parse(catchData);
  }
  const fileInfo = await FileInfo.find({ user: user.id }).lean();
  console.log("from db");
  if (!fileInfo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No files found");
  }
  await RedisService.setRedis({
    key: `file:${user.id}`,
    value: JSON.stringify(fileInfo),
    expiration: 60 * 60 * 24, // 24 hours
  });
  return fileInfo;
};

// get all conversations based on file
const getAllConversationsBasedOnFile = async (fileId: string) => {
  const fileInfo = await FileInfo.findById(fileId).lean();
  if (!fileInfo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "File not found");
  }
  const conversations = await Conversation.find({ file: fileId }).lean();
  return conversations;
};

// delete file from db
const deleteFileFromDB = async (id: string) => {
  const fileInfo = await FileInfo.findByIdAndDelete(id);
  if (!fileInfo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "File not found");
  }
  await RedisService.deleteRedis(`file:${fileInfo.user}`);
  return fileInfo;
};
export const FileService = {
  createFileIntoDB,
  updateFileIntoDB,
  getAllFilesFromDB,
  getAllConversationsBasedOnFile,
  deleteFileFromDB,
};
