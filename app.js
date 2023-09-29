import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { connectDB } from "./data/database.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { errorMiddleWare } from "./middlewares/error.js"
import cors from "cors"


const app = express()

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","PUT","POST","DELETE"],
    credentials : true,
}))

//ERROR MIDDLEWARE
app.use(errorMiddleWare)

dotenv.config({
    path :"./config.env"
})

//Database connect
connectDB()





app.listen(process.env.PORT,()=>{
    console.log(`server is running on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

