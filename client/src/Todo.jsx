import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [tasks, setTasks] = useState("")
    const [editId, setEditId] = useState(null)
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(tasks.trim()=="") return
        try {
            if(editId){
                const res = await fetch(`http://localhost:3000/api/db/update/${editId}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({tasks})
                })
                const data = await res.json()
                getData()
                console.log(data)
            }else{
                const res = await fetch("http://localhost:3000/api/db/add", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ tasks }),
                });
                const data = await res.json();
                console.log(data);
                setTasks("");
                getData();
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const getData = async()=>{
        try {
            const res = await fetch("http://localhost:3000/api/db")
            const data = await res.json()
            console.log(data)
            setTodos(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteData = async(id)=>{
        try {
            const res = await fetch(`http://localhost:3000/api/db/delete/${id}`,{
                method:"DELETE"
            })
            const data = await res.json()
            console.log(data)
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = (item)=>{
        setTasks(item.tasks)
        setEditId(item.id)
    }

    useEffect(()=>{
        getData()
    },[])

  return (
    <div>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Add to todos' value={tasks} onChange={(e)=>setTasks(e.target.value)}/>
                <button type="submit">{editId?"Update":"Add"}</button>
            </form>
        </div>
        <div>
            {todos.map((item,index)=>(
                <div key={index}>
                    <p>{item.tasks}</p>
                    <div>
                        <button onClick={()=>handleUpdate(item)}>Edit</button>
                        <button onClick={()=>deleteData(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Todo