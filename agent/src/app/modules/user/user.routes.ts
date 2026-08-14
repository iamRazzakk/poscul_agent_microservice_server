import express from "express";
import { USER_ROLES } from "../../../enums/user";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  getSingleFilePath,
  getUploadFields,
} from "../../middlewares/fileUploaderHandlar";

const router = express.Router();

router.get(
  "/profile",
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  UserController.getUserProfile,
);

router.post(
  "/create-admin",
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin,
);

router
  .route("/")
  .post(
    getUploadFields(),
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser,
  )
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    getUploadFields(),
    async (req, res, next) => {
      try {
        const data = req.body;
        const profilePath = getSingleFilePath(
          req.files as Record<string, Express.Multer.File[]>,
          "image",
        );
        if (profilePath) {
          data.profile = profilePath;
        }
        req.body = data;
        next();
      } catch (error) {
        next(error);
      }
    },
    UserController.updateProfile,
  );

export const UserRoutes = router;
