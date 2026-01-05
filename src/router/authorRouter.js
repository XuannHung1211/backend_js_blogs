import express from "express"
import { signUp , signIn , signOut } from "../controller/authorController.js"

const route = express.Router()

route.post("/signup" , signUp)

route.post("/signin" , signIn)

route.post("/signout" , signOut)


export default route