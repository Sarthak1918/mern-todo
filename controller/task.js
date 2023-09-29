import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const addTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user._id
        })
        console.log(req.user);
        res.status(201).json({
            success: true,
            message: "Task added successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const id = req.user._id
        const tasks = await Task.find({ user: id })
        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }

}

export const updateStatus = async (req, res, next) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id)

        if (!task) return next(new ErrorHandler("Invalid Id", 404))

        task.isCompleted = !task.isCompleted
        await task.save()
        res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id)
        if (!task) return next(new ErrorHandler("Invalid Id", 404))
        task.deleteOne()
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })
    } catch (error) {
        next(error)
    }

}