import express, { Request, Response } from 'express'
import { bookRoutes } from './app/controllers/books.controller'
import { borrowRoutes } from './app/controllers/borrow.controller'
const app = express()

// Middleware
app.use(express.json())

// Route Middleware
app.use('/books', bookRoutes)
app.use('/borrow', borrowRoutes)

// Root api & Default api
app.get("/", (req: Request, res: Response) => {
    res.send("Library Management Server is running successfully")
})


export default app
