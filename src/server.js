import express from "express"
import dotenv from "dotenv"
import blogRouter from "./router/blogRouter.js"
import authorRouter from "./router/authorRouter.js"
import userRouter from "./router/userRouter.js"
import { connectDb } from "./config/db.js"
import cors from "cors"              
import { protectedUser } from "./middlewares/authMiddleware.js"



const app = express()

dotenv.config();

const PORT = process.env.PORT || 5001


// middlewares
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))






//public router
app.use("/api/auth" , authorRouter)



//private router
app.use(protectedUser)
app.use("/api/blogs",blogRouter)

connectDb()

app.listen(PORT , () => {
    console.log("server start runing locallhost:", PORT)
})


