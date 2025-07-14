import express, { Router ,Request, Response } from "express";
import dotenv from "dotenv";
import Task from "../models/task.model"; // Đảm bảo đúng đường dẫn model
import { index , detail } from "../controller/task.controller"; //{TaskController} 
dotenv.config();

const router = Router();

// Lấy danh sách task chưa bị xóa
router.get("/", index )
// Lấy chi tiết task theo id
router.get("/detail/:id",detail )

export default router;
