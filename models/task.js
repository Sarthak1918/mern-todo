import mongoose from "mongoose"

//Schema
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    isCompleted:{
        type : Boolean,
        default: false,
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }

})

//Model
export const Task = mongoose.model("task", taskSchema)