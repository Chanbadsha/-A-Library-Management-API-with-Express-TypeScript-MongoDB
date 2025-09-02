import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model'
import { ObjectId } from 'mongodb'
import { Books } from '../models/books.model'

export const borrowRoutes = express.Router()

// Create a borrow history

borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body

        const bookId = new ObjectId(book)

        const isAvailable = await Books.hasEnoughCopies({ quantity, bookId });
        if (!isAvailable) {
            throw new Error("Not enough copies available to borrow");
        }


        const borrow = await Borrow.create({ book, quantity, dueDate })

        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message,
            error
        })
    }
})

// Get all borrow histry


borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {

        const borrow = await Borrow.aggregate([

            {
                $group: {
                    _id: "$book",
                    book: {
                        $push: "$$ROOT"
                    },
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$book" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1

                }
            }

        ])



        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrow,
        });
    } catch (error: any) {
        res.status(401).json({
            succeess: false,
            message: error.message,
            error
        })
    }
})