import express from "express"
import { isAuthenticate } from "../middlewares/auth.js"
import { addTask, deleteTask, getMyTask, updateStatus } from "../controller/task.js";

const router = express.Router()

router.post("/new",isAuthenticate,addTask)
router.get("/my",isAuthenticate,getMyTask)
router.put("/update/:id",isAuthenticate,updateStatus)
router.delete("/delete/:id",isAuthenticate,deleteTask)

//or router.route("/:id").put(isAuthenticate,updateStatus).delete(isAuthenticate,deleteTask) //since the initial is same
export default router;