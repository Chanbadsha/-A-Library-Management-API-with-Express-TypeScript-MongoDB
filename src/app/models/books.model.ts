import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.inteface";

const booksSchema = new Schema<IBooks>({
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
        validate: {
            validator: function (value) {
                return value >= 0
            },
            message: props => `Book copies (${props.value}) cannot be a negative number`
        }
    },
    available: {
        type: Boolean,
        default: true
    }
})

const Books = model<IBooks>("Books", booksSchema)