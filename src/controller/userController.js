import User from "../model/user.js"

export const getAllUser = async (req, res) => {
        try {
                const userSchema = await User.find()
                res.status(200).json(userSchema)
        } catch (error) {
                console.error(error)
                res.status(500).json({ message: "not found" })
        }
}