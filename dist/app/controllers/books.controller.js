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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const mongodb_1 = require("mongodb");
exports.bookRoutes = express_1.default.Router();
// A api for create a books info
exports.bookRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booksInfo = req.body;
        const book = yield books_model_1.Books.create(booksInfo);
        res.status(200).json({
            "success": true,
            "message": "Book created successfully",
            "data": book
        });
    }
    catch (error) {
        next(error);
    }
}));
// A api for get all books
exports.bookRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, genre, Genre, sortBy = "createdAt", sort, limit } = req.query;
        const appliedGenre = filter || genre || Genre;
        const filterData = appliedGenre ? { genre: appliedGenre } : {};
        const limited = typeof limit === "string" ? parseInt(limit) : 10;
        const sortedData = sort === "asc" ? "asc" : "desc";
        const books = yield books_model_1.Books.find(filterData).sort({ [sortBy]: sortedData }).limit(limited);
        res.status(200).json({
            "success": true,
            "message": "Books retrieved successfully",
            "data": books
        });
    }
    catch (error) {
        next(error);
    }
}));
// A api for get single book by id
exports.bookRoutes.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.bookId;
        const book = yield books_model_1.Books.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// A api for update single book by id
exports.bookRoutes.patch("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.bookId;
        const id = new mongodb_1.ObjectId(bookId);
        const updateDoc = req.body;
        const book = yield books_model_1.Books.findOneAndUpdate(id, updateDoc, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// A api for Delete single book by id
exports.bookRoutes.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.bookId;
        const id = new mongodb_1.ObjectId(bookId);
        const book = yield books_model_1.Books.findOneAndDelete(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
}));
