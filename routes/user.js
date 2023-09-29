import express from "express"
import { getMyDetails, login, logout, register } from "../controller/user.js"
import { isAuthenticate } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/me",isAuthenticate,getMyDetails)

export default router;