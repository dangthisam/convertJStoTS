"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    tokenUser: { type: String },
    phone: String,
    avatar: { type: String, default: null },
    status: {
        type: String,
        default: 'active'
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: { type: Date },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('User', userSchema, "users");
exports.default = User;
