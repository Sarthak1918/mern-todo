import { User } from "../models/user.js"
import jwt from "jsonwebtoken"
export const isAuthenticate = async(req, res, next) => {
    const {token} = req.cookies

    if(!token){
        return res.status(404).json({
            success:false,
            message:"Login First"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const id = decoded._id
    req.user = await User.findById(id)
    next();
}