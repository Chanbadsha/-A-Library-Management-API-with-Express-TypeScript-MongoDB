"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Route Middleware
app.use('/books', books_controller_1.bookRoutes);
app.use('/borrow', borrow_controller_1.borrowRoutes);
// Root api & Default api
app.get("/", (req, res) => {
    res.send("Library Management Server is running successfully");
});
// Errror handeling for not fund route
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        Error
    });
});
// Global error handleing
app.use((error, req, res, next) => {
    res.status(401).json({
        succeess: false,
        message: error.message,
        error
    });
});
exports.default = app;
