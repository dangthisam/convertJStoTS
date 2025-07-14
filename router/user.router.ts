import express from "express";
const router =express.Router();

import { userRegister ,login , detailUser } from "../controller/user.controller";

import authUser from "../middleware/user.authozition";

router.post("/register" , userRegister);
router.post("/login" , login )

router.get("/detail" ,  authUser , detailUser)
export default router;