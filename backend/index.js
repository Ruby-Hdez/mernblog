// importing required modules 
import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import "./database/database.js"
import UserRouter from './routes/userFunctions.js';
import BlogRouter from './routes/blog.js';

dotenv.config() 
const app = express()

// import json for routers
app.use(express.json())
app.use(cors({credentials: true}))

// router for user - contains post & get routes within
app.use("/backend/User", UserRouter)
app.use("/backend/Blog", BlogRouter)

// process port number 
const port = process.env.PORT; 

// run the server on port 
app.listen(port, () => {
    console.log("App is running on port", port);
})
