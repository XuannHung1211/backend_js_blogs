import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            trim : true,
        } ,
        content : {
            type : String,
            required: true,
        } ,
       
     },
    {
        timestamps : true,
    }

)

const Blogs = mongoose.model("Blogs" , blogSchema)

export default Blogs