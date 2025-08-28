import mongoose from "mongoose"
import 'dotenv/config'
import app from "./app"
import { Server } from 'http'
const port = process.env.PORT || 5000;
let server: Server

const bootStrap = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@cluster0.t47d6.mongodb.net/LibraryManagement?retryWrites=true&w=majority&appName=Cluster0`)
        server = app.listen(port, () => {
            console.log(`Library Management Server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

bootStrap()