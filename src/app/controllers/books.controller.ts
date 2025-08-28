import express, { Request, Response } from 'express'
import { Books } from '../models/books.model'

export const bookRoutes = express.Router()


// A api for create a books info
bookRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const booksInfo = req.body
        const book = await Books.create(booksInfo)
        res.status(200).json({
            "success": true,
            "message": "Book created successfully",
            "data": book
        })
    } catch (error: any) {
        res.status(401).json({
            succeess: false,
            message: error.message,
            error
        })
    }
})
