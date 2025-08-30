import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model'
import app from '../../app'

export const borrowRoutes = express.Router()

// Create a borrow history

borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const borrowInfo = req.body

        const borrow = await Borrow.create(borrowInfo)
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
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