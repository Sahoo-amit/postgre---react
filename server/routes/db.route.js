import express from 'express'
import { createTask, getAllTasks, getTask, updateTask, deleteTask } from '../controllers/db.controller.js'

const router = express.Router()

router.post("/add",createTask)
router.get("/",getAllTasks)
router.get("/:id",getTask)
router.put("/update/:id",updateTask)
router.delete("/delete/:id",deleteTask)

export default router