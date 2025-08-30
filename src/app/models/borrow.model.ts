import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

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

export const Borrow = model<IBorrow>("Borrow", borrowSchema)