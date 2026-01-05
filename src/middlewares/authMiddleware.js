import jwt from "jsonwebtoken"
import User from "../model/user.js"

export const protectedUser = (req, res, next) => {
    try {
        //lấy token từ header 
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1] // authHeader tồn tại và lấy access token sau cái Bearer

        if (!token) {
            return res.status(400).json({ message: "Token không tồn tại" })
        }
        //xác nhận token hợp lệ
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , async (err , decodedUser)=> {

            if(err){
                console.log("token không hợp lệ" , err)
                return res.status(403).json({message:"token không hợp lệ"})
            }

            //tìm user
            const user = await User.findById(decodedUser.userId).select('-password') // lấy tất cả thông tin trừ password

            //trả về user về trong req
            req.user = user
            next()

        })


    } catch (error) {
        console.log("Lỗi xác thực  ", error)
        return res.status(500).json({ message: "lỗi xác thực người dùng" })
    }

}