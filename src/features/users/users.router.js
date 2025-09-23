import express from "express"
import { getAllUsersController, profileDetailsController, updateProfileController, updateUserRoleController, userLoginController, userRegisterController } from "./users.controller.js";
import encrytPassword from "../../../middleware/encryptPassword.js";
import { generateToken, validateToken } from "../../../middleware/token.js";
import upload from "../../../middleware/multer.js";


const router = express.Router();


router.post("/register", upload.single("avatar"), encrytPassword, userRegisterController)
router.post("/login", userLoginController, generateToken)
router.get("/me/:id", profileDetailsController)
router.put("/me", upload.single("avatar"), updateProfileController)
router.get("/all",validateToken, getAllUsersController)
router.put("/updateRole/:id",validateToken,updateUserRoleController)


export default router;