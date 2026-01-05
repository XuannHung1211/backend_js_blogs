import mongoose from "mongoose"


export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTIONDB)
        console.log("connect database success")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}