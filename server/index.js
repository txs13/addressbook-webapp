import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

import connectDb from "./db/connect.js";
import router from './routes/contacts.js'
import errorHandlerMiddlWare from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors())
app.use(express.static('../client/build'))

//routes
app.use('/api/v1/contacts', router)
app.use(errorHandlerMiddlWare)
app.use(notFound)


//database connect & server listener

const start = async () => {
    try {
        await connectDb(process.env.DB_URI)
        // mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
        //     console.log(methodArgs);
        // })
        app.listen(port,()=>{
            console.log(`server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()