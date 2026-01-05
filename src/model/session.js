import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true ,
        index : true
    } ,

    refreshToken : {
        type: String,
        required : true ,
        unique : true 
    } ,
    expires : {
        type : Date,
        required : true
    }
    } , 

    {
        timestamp : true 
    }
)


// tu dong xoa khi het han
sessionSchema.index({expires : 1} , {expireAfterSeconds : 0})

const Session = mongoose.model('Session' , sessionSchema)

export default Session