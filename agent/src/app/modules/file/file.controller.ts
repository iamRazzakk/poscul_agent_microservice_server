import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { FileService } from "./file.service";
import { Request, Response } from "express";

const createFile = catchAsync(async (req: Request, res: Response) => {
  const file = await FileService.createFileIntoDB(req.body, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "File created successfully",
    data: file,
  });
});

const updateFile = catchAsync(async (req: Request, res: Response) => {
  const file = await FileService.updateFileIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "File updated successfully",
    data: file,
  });
});

const getAllFiles = catchAsync(async (req: Request, res: Response) => {
  const files = await FileService.getAllFilesFromDB(req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Files fetched successfully",
    data: files,
  });
});

const deleteFile = catchAsync(async (req: Request, res: Response) => {
  const file = await FileService.deleteFileFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "File deleted successfully",
    data: file,
  });
});

export const FileController = {
  createFile,
  updateFile,
  deleteFile,
  getAllFiles,
};
