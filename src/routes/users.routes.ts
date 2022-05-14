import {Router} from "express";
import multer from "multer";
import {CreateUserController} from "../modules/accounts/useCases/user/create/CreateUserController";
import {UpdateUserAvatarController} from "../modules/accounts/useCases/user/updateAvatar/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import {ensureAuthenticated} from "../middlewares/ensureAuthenticated";

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