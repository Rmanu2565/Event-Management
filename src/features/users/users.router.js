import express from "express"
import { userRegisterController } from "./users.controller.js";


const router = express.Router();


router.post("/register",userRegisterController)




export default router;