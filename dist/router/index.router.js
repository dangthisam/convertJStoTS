"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const task_router_1 = __importDefault(require("../router/task.router"));
const user_router_1 = __importDefault(require("../router/user.router"));
const user_authozition_1 = __importDefault(require("../middleware/user.authozition"));
const mainV1Router = (app) => {
    const version = "/api/v1";
    app.use(version + "/tasks", user_authozition_1.default, task_router_1.default);
    app.use(version + "/user", user_router_1.default);
};
exports.default = mainV1Router;
