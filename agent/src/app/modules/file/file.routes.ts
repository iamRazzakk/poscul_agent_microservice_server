import { Router } from "express";
import { FileController } from "./file.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FileInfoValidation } from "./file.validation";
import requireUser from "../../middlewares/requireUser";

const router = Router();

router
  .route("/")
  .post(
    requireUser(),
    validateRequest(FileInfoValidation.createFileInfoValidation),
    FileController.createFile,
  )
  .get(requireUser(), FileController.getAllFiles);

router
  .route("/:id")
  .patch(requireUser(), FileController.updateFile)
  .delete(requireUser(), FileController.deleteFile);

export const FileRoutes = router;
