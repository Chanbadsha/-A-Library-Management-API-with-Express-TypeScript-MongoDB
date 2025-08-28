import express, { Request, Response } from 'express'
const app = express()

// Middleware
app.use(express.json())


// Root api & Default api
app.get("/", (req: Request, res: Response) => {
    res.send("Library Management Server is running successfully")
})


export default app
