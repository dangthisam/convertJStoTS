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
exports.deleteManyTask = exports.deleteTask = exports.editTask = exports.createTask = exports.changeMultiStatus = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_1 = __importDefault(require("../helper/pagination"));
const search_1 = __importDefault(require("../helper/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    const countTasks = yield task_model_1.default.countDocuments(find);
    let objectPagination = (0, pagination_1.default)({
        currentPage: 1,
        limitPage: 2
    }, req.query, countTasks);
    const objectSearch = (0, search_1.default)(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    const data = yield task_model_1.default.find(find)
        .sort(sort)
        .limit(objectPagination.limitPage)
        .skip(objectPagination.skip);
    res.json(data);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield task_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.json(data);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        if (!status) {
            return res.status(400).json({
                status: 400,
                message: "Thiếu trường status trong body"
            });
        }
        const data = yield task_model_1.default.findOneAndUpdate({ _id: id, deleted: false }, { status: status }, { new: true });
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Không tìm thấy task hoặc task đã bị xóa"
            });
        }
        res.json({
            status: 200,
            message: "success",
            data: data
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "fail",
            error: error.message
        });
    }
});
exports.changeStatus = changeStatus;
const changeMultiStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        yield task_model_1.default.updateMany({
            _id: { $in: ids },
            deleted: false
        }, {
            status: value
        });
        res.json({
            status: 200,
            message: "Upadate thành công"
        });
    }
    catch (error) {
        res.json({
            status: 500,
            message: "fail",
            error: error.message
        });
    }
});
exports.changeMultiStatus = changeMultiStatus;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new task_model_1.default(req.body);
        yield data.save();
        res.json({
            status: 200,
            message: "success",
            data: data
        });
    }
    catch (error) {
        res.json({
            status: 500,
            message: "fail",
            error: error.message
        });
    }
});
exports.createTask = createTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        yield task_model_1.default.findOneAndUpdate({
            _id: id,
            deleted: false
        }, data, {
            new: true
        });
        res.json({
            status: 200,
            message: "success"
        });
    }
    catch (error) {
        res.json({
            status: 500,
            message: "fail",
            error: error.message
        });
    }
});
exports.editTask = editTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.findOneAndUpdate({
            _id: id,
            deleted: false
        }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            status: 200,
            message: "success"
        });
    }
    catch (error) {
        res.json({
            status: 500,
            message: "fail",
            error: error.message
        });
    }
});
exports.deleteTask = deleteTask;
const deleteManyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    try {
        yield task_model_1.default.updateMany({
            _id: { $in: ids },
            deleted: false
        }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            status: 200,
            message: "success"
        });
    }
    catch (error) {
        res.json({
            status: 500,
            message: "fail",
            error: error.message
        });
    }
});
exports.deleteManyTask = deleteManyTask;
