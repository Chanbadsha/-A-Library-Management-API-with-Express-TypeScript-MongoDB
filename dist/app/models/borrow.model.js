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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Books",
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value.getTime() > Date.now();
            },
            message: (props) => `Book return date should be a future date`
        }
    }
}, {
    versionKey: false,
    timestamps: true
});
// Middleware: reduce copies before saving
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrow = this;
        const book = yield books_model_1.Books.findById(borrow.book);
        if (!book) {
            return next(new Error("Book not found"));
        }
        if (book.copies < borrow.quantity) {
            return next(new Error("Not enough copies available"));
        }
        book.copies -= borrow.quantity;
        if (book.copies === 0)
            book.available = false;
        yield book.save();
        next();
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
