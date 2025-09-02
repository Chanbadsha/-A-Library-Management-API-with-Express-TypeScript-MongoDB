import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Books } from "./books.model";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
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
            validator: function (value: Date) {

                return value.getTime() > Date.now();
            },
            message: (props: any) => `Book return date should be a future date`
        }
    }

},
    {
        versionKey: false,
        timestamps: true
    })



// Middleware: reduce copies before saving
borrowSchema.pre("save", async function (next) {
    const borrow = this as any;

    const book = await Books.findById(borrow.book);
    if (!book) {
        return next(new Error("Book not found"));
    }

    if (book.copies < borrow.quantity) {
        return next(new Error("Not enough copies available"));
    }

    book.copies -= borrow.quantity;
    if (book.copies === 0) book.available = false;
    await book.save();

    next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema)