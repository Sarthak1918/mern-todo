import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { tokenGenerator } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js"



export const getMyDetails = (req, res) => {
    //here middleware is used (check middleware->auth.js and routes->user.js)
    res.status(200).json({
        success: true,
        user: req.user
    })
}



//Register
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        let user = await User.findOne({ email })
        if (user) return next(new ErrorHandler("User Already Exist", 400))
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                name,
                email,
                password: hashedPassword
            })

            tokenGenerator(res, user, 201, "Registered Successfully")

        }
    } catch (error) {
        next(error)
    }

}

//Login
export const login = async (req, res,next) => {
    try {
        const { email, password } = req.body
    let user = await User.findOne({ email }).select("+password")
    if (!user) return next(new ErrorHandler("Invalid Username or password", 400))
    else {
        const isPasswordMatch = bcrypt.compare(password, user.password)
        if (!isPasswordMatch) return next(new ErrorHandler("Invalid Username or password", 404))
        else {
            tokenGenerator(res, user, 200, `Welcome back,${user.name}`)
        }
    }
    } catch (error) {
        next(error)
    }
}

//Logout
export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "Logout Successfully"
    })
}