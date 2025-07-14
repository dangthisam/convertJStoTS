import express from "express";
const router =express.Router();

import { userRegister } from "../controller/user.controller";


router.post("/register" , userRegister);
export default router;