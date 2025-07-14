import { Router  } from "express";
import dotenv from "dotenv";

import { index , detail , changeStatus , changeMultiStatus  , createTask} from "../controller/task.controller"; //{TaskController} 
dotenv.config();

const router = Router();

// Lấy danh sách task chưa bị xóa
router.get("/", index )
// Lấy chi tiết task theo id
router.get("/detail/:id",detail )

router.patch("/change-status/:id" , changeStatus);

router.patch("/change_multi_status", changeMultiStatus)

router.post("/create-task" , createTask)

export default router;
