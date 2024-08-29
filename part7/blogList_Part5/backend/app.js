import express from "express";
import cors from 'cors'
import config from "./utils/config.js";
import mongoose from "mongoose";
import blogRouter from "./controllers/blogs.js";
import middlewares from "./utils/middlewares.js";
import logger from "./utils/logger.js";
import userRouter from './controllers/users.js'
import 'express-async-errors';
import loginRouter from "./controllers/login.js";
import router from "./controllers/testing.js";

const app = express();

mongoose.set('strictQuery',false)
mongoose.connect(config.URL)
.then(()=>{
    logger.info(`connected to MongoDb`)
})
.catch((error)=>{
    logger.error(`error connecting to DB`, error.message)
})

app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)
app.use(middlewares.tokenExtractor)

app.use('/api/login',loginRouter)
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing',router)
}

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)



export default app;