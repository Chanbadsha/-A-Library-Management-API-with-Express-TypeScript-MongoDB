import express, { NextFunction, Request, Response } from 'express'
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



// Errror handeling for not fund route

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        Error
    });
});



// Global error handleing

app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    res.status(401).json({
        succeess: false,
        message: error.message,
        error
    })
})

export default app
