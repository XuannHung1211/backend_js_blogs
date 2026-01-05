import express from "express"
import { postBlog ,deleteBlog , getAllBlog , updateBlog , getBlog } from "../controller/blogController.js";


const route = express.Router()

route.get("/", getAllBlog)

route.get("/:id", getBlog)

route.post("/",postBlog)

//dung path thay doi 1 phan thay vi put thay doi tat ca
route.patch("/:id", updateBlog)

route.delete("/:id", deleteBlog)


export default route