import express, { json, Request, Response } from 'express'
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


// A api for get all books

bookRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const { filter, genre, Genre, sortBy = "createdAt", sort, limit } = req.query
        const appliedGenre = filter || genre || Genre

        const filterData = appliedGenre ? { genre: appliedGenre } : {}
        const limited = typeof limit === "string" ? parseInt(limit) : 10

        const sortedData = sort === "asc" ? "asc" : "desc"
        const books = await Books.find(filterData).sort({ [sortBy as string]: sortedData }).limit(limited)

        res.status(200).json({
            "success": true,
            "message": "Books retrieved successfully",
            "data": books
        })
    } catch (error: any) {
        res.status(401).json({
            succeess: false,
            message: error.message,
            error
        })
    }
})