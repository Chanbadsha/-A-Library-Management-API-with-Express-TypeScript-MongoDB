import express, { json, Request, Response } from 'express'
import { Books } from '../models/books.model'
import { ObjectId } from 'mongodb'
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


// A api for get single book by id

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req?.params?.bookId
        const book = await Books.findById(bookId)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    } catch (error: any) {
        res.status(401).json({
            succeess: false,
            message: error.message,
            error
        })
    }
})
// A api for get single book by id

bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req?.params?.bookId
        const id = new ObjectId(bookId)
        const updateDoc = req.body
        // console.log(updateDoc)
        const book = await Books.findOneAndUpdate(id, updateDoc)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    } catch (error: any) {
        res.status(401).json({
            succeess: false,
            message: error.message,
            error
        })
    }
})
