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
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        enum: ["FICTION", "NON-FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"]
        // validate: {
        //     validator: function (value) {
        //         return value >= 0
        //     },
        //     message: props => `Copies must be a positive number`
        // }
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// A pre hook validation for update book
// booksSchema.pre("findOneAndUpdate", async function (next) {
//     const update = this.getUpdate() as Partial<IBooks>;
//     if (update.copies !== undefined && update.copies < 0) {
//         const err = new Error("Copies must be a positive number");
//         err.name = "ValidationError";
//         return next(err);
//     }
//     next();
// });
//  A static method to check has enoguh copies
booksSchema.static("hasEnoughCopies", function (_a) {
    return __awaiter(this, arguments, void 0, function* ({ quantity, bookId }) {
        const book = yield this.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        return book.copies >= quantity && book.available;
    });
});
exports.Books = (0, mongoose_1.model)("Books", booksSchema);
