
import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Session from "../model/session.js"



export const signUp = async (req, res) => {

    try {
        const { username, password, name } = req.body

        if (!username || !password || !name) {
            return res.status(400).json({ message: "Thieu thong tin dang ky" })
        }

        // kiem tra xem user ton tai chua
        const duplicate = await User.findOne({ username })

        if (duplicate) {
            return res.status(409).json({ message: "User da ton tai" })
        }

        // neu khong co thi hashed Password 
        const hashedPasssword = await bcrypt.hash(password, 10); //trộn pass 10 lần 


        // tao user moi
        await User.create({
            username,
            password: hashedPasssword,
            name
        })


        // return 
        return res.status(200).json({ message: "Dang ki thanh cong" })
    } catch (error) {
        console.log("Loi tao tai khoan", error)
    }


}


export const signIn = async (req , res) => {

    const ACCESS_TOKEN_TIME = '15m' // 15p
    const REFRESH_TOKEN_TIME = 14 * 24 * 60 * 60 * 1000 // 14 ngay
    
    try {
        // lấy thông tin đăng nhập
        const {username , password} = req.body

    

        if(!username || !password){
            return res.status(404).json({message :"khong tim thay username hoac password"})
        }


        //kiểm tra username xem có tồn tại không 
        const user = await User.findOne({username})

        if(!user){
            return res.status(401).json({message : "username hoac password khong ton tai"})
        }

        // kiem tra password 
        const passwordCorrect = await bcrypt.compare(password , user.password)
        
        if(!passwordCorrect){
            return res.status(400).json({message:"username hoac password khong chinh xac"})
        }


        // neu khop thi tao access token 
        const AccessToken = jwt.sign({userId : user._id} , process.env.ACCESS_TOKEN_SECRET , {expiresIn : ACCESS_TOKEN_TIME})

        //tao refresh token 
        const refreshToken = crypto.randomBytes(64).toString('hex')


        //tao session de luu refreshtoken 
        await Session.create({
            userId : user._id ,
            refreshToken ,
            expires : new Date(Date.now() + REFRESH_TOKEN_TIME)
        })

        // tra ve refresh token ve trong cookie 
        res.cookie("refreshToken" , refreshToken , {
            httpOnly: true ,
            secure:true,
            sameSite : "none" , // neu backend , frontend dely rieng
            maxAge : REFRESH_TOKEN_TIME
        })

        // tra ve access token trong res 
        return res.status(200).json({message : "Dang nhap thanh cong" , AccessToken})
    } catch (error) {
        console.log("Lỗi đăng nhập " , error)
        res.status(500).json("Lỗi đăng nhập...")
    }

}

export const signOut = async (req , res) => {
    try {
        
        // lay refresh token trong cookie 
        const token = req.cookies?.refreshToken

        if(token){
            // xóa refresh  token trong cookie 
            await Session.deleteOne({refreshToken : token})

            // xóa cookie
            res.clearCookie("refreshToken")

        }
        
        return res.sendStatus(204)

    } catch (error) {
        console.log("Lỗi xóa refreshToken" , error)
        return res.status(500).json({message : "Lỗi xóa cookie"})
    }
}