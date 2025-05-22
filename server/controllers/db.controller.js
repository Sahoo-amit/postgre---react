import { pool } from "../db.js"

export const createTask = async(req,res)=>{
    try {
        const {tasks} = req.body
        const newTask = await pool.query("insert into todos (tasks) values($1) returning *", [tasks])
        res.json(newTask.rows[0])
    } catch (error) {
        console.log(error)
    }
}

export const getAllTasks = async(req,res)=>{
    try {
        const getData = await pool.query("select * from todos")
        res.json(getData.rows)
    } catch (error) {
        console.log(error)
    }
}

export const getTask = async(req,res)=>{
    try {
        const {id} = req.params
        const getData = await pool.query("select * from todos where id=($1)", [id])
        res.json(getData.rows)
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await pool.query("delete from todos where id=($1)", [id])
        res.json(result.rows)
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async(req,res)=>{
    try {
        const {id} = req.params
        const {tasks} = req.body
        const newTodo = await pool.query("update todos set tasks=$1 where id=$2", [tasks,id])
        res.json(newTodo.rows)
    } catch (error) {
        console.log(error)
    }
}