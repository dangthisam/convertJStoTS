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
exports.detailUser = exports.login = exports.userRegister = void 0;
const md5_1 = __importDefault(require("md5"));
const generate_1 = require("../helper/generate");
const user_model_1 = __importDefault(require("../models/user.model"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = (0, md5_1.default)(req.body.password);
    const existEmail = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (existEmail) {
        res.json({
            message: "email đã tồn tại",
            status: 400
        });
    }
    else {
        const tokenUser = (0, generate_1.generateRandomString)(32);
        const data = new user_model_1.default(Object.assign(Object.assign({}, req.body), { tokenUser: tokenUser }));
        yield data.save();
        const tokenUsers = data.tokenUser;
        res.cookie("tokenUser", tokenUser);
        res.json({
            message: "create account success",
            status: 200,
            tokenUsers: tokenUsers
        });
    }
});
exports.userRegister = userRegister;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const existEmail = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!existEmail) {
        res.json({
            message: "email không tồn tại",
            status: 400
        });
    }
    if ((0, md5_1.default)(password) !== existEmail.password) {
        res.json({
            message: "password không đúng",
            status: 400
        });
    }
    const tokenUser = existEmail.tokenUser;
    res.cookie("tokenUser", tokenUser);
    res.json({
        message: "login success",
        status: 200,
        tokenUser: tokenUser
    });
});
exports.login = login;
const detailUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "success",
        status: 200,
        data: req["user"]
    });
});
exports.detailUser = detailUser;
