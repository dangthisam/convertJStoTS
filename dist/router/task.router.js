"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const task_controller_1 = require("../controller/task.controller");
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.get("/", task_controller_1.index);
router.get("/detail/:id", task_controller_1.detail);
router.patch("/change-status/:id", task_controller_1.changeStatus);
router.patch("/change_multi_status", task_controller_1.changeMultiStatus);
router.post("/create-task", task_controller_1.createTask);
router.post("/edit-task/:id", task_controller_1.editTask);
router.delete("/delete-task/:id", task_controller_1.deleteTask);
router.delete("/delete-manytask", task_controller_1.deleteManyTask);
exports.default = router;
