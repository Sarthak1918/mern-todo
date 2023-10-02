import mongoose from "mongoose"

//Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        unique: true,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }

})

//Model
export const User = mongoose.model("user", userSchema)