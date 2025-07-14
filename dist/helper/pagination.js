"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectPagination = void 0;
const objectPagination = (objectPagination, query, countRecords) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPagination.limitPage = parseInt(query.limit);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitPage;
    const totalPage = (countRecords / objectPagination.limitPage);
    objectPagination.totalPage = Math.ceil(totalPage);
    return objectPagination;
};
exports.objectPagination = objectPagination;
exports.default = exports.objectPagination;
