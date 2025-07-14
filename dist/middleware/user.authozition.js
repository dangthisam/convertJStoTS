"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let tokenUser = req.headers.authorization;
    if (!tokenUser) {
        res.json({
            message: "token khong tồn tại",
            status: 400
        });
    }
    else {
        tokenUser = tokenUser.split(" ")[1];
        const user = yield user_model_1.default.findOne({
            tokenUser: tokenUser
        }).select("-password -tokenUser -__v -createdAt -updatedAt -deletedAt -deleted");
        if (!user) {
            res.json({
                message: "user không tồn tại",
                status: 400
            });
            return;
        }
        req["user"] = user;
        next();
    }
});
exports.default = authUser;
