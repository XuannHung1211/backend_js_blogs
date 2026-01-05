
import Blogs from "../model/blogs.js"


export const getAllBlog = async (req, res) => {
        try {
                const blogs = await Blogs.find()
                res.status(200).json(blogs)
        } catch (error) {
                console.error(error)
                res.status(500).json({ message: "not found" })
        }
}


export const getBlog = async (req, res) => {
        try {
                const getBlog = await Blogs.findById(req.params.id)

                if(!getBlog){
                        return res.status.json({message :"blog ko ton tai"})
                }
                return res.status(200).json(getBlog)

        } catch (error) {
                console.log(error)
                res.status(500).json({ message: "k the tim thay blog" })
        }
}



export const postBlog = async (req, res) => {
        try {
                const { title, content } = req.body
                const blog = new Blogs({ title, content })

                const newBlog = await blog.save()
                res.status(201).json(newBlog)

        } catch (error) {
                console.log(error)
                res.status(500).json({ message: "k the tao blog moi" })
        }
}

export const updateBlog = async (req, res) => {
        try {
                const {title , content , updatedAt} = req.body
                const updateBlog = await Blogs.findByIdAndUpdate(
                        req.params.id ,
                        {
                                title,
                                content
                        },
                        {
                                new : true
                        }
                )
                if(!updateBlog){
                      return  res.status(404).json({message : "khong tim thay blog"})
                }
                return res.status(200).json(updateBlog)
        } catch (error) {
                console.error(error)
                return res.status(500).json({message : "Loi update blog"})
        }
}

export const deleteBlog = async (req, res) => {
       try {
        const deleteBlog = await Blogs.findByIdAndDelete(req.params.id )   
                if(!deleteBlog){
                        return res.status(404).json({message:"blogs delete k ton tai"})
                }
                return res.status(200).json(deleteBlog)
       } catch (error) {
                console.log(error)
                return res.status(500).json({message:"delete that bai"})
       }
}