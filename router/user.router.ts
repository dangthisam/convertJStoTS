import express from "express";
const router =express.Router();

import { userRegister ,login  } from "../controller/user.controller";


router.post("/register" , userRegister);
router.post("/login" , login )
export default router;