import mongoose from "mongoose";


export const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI, {
    dbName: "company"
})
    .then(() => console.log("db connected"))
    .catch(err => console.log(err))
}
