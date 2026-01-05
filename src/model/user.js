import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        trim : true ,
        lowercase:true ,
        unique : true
    } ,
    password: {
        type : String,
        required: true ,
        trim:true
     ,
    } ,
    name : {
        type:String,
        required:true,
    }

} , {
    Timestamp:true
})

const User = mongoose.model("User" , userSchema)
export default User