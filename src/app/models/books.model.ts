import { model, Query, Schema } from "mongoose";
import { IBooks, IBooksCopiesCheck } from "../interfaces/books.inteface";

const booksSchema = new Schema<IBooks, IBooksCopiesCheck>({
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
})



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

booksSchema.static(
    "hasEnoughCopies",
    async function ({ quantity, bookId }: { quantity: number; bookId: string }) {
        const book = await this.findById(bookId);
        console.log(book)
        if (!book) {
            throw new Error("Book not found");
        }
        return book.copies >= quantity && book.available;
    }
);



export const Books = model<IBooks, IBooksCopiesCheck>("Books", booksSchema)