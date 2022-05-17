import {Router} from "express";
import multer from "multer";

import {CreateUserController} from "@modules/accounts/useCases/user/create/CreateUserController";
import {UpdateUserAvatarController} from "@modules/accounts/useCases/user/updateAvatar/UpdateUserAvatarController";
import {ensureAuthenticated} from "@middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

userRoutes.post("/", createUserController.handle);
userRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export {userRoutes}