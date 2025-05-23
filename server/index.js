import express from 'express'
import cors from 'cors'
import dbRoute from './routes/db.route.js'

const app = express()
app.use(express.json())
const corsOption={
    origin:"https://postgre-react-frontend.onrender.com",
    credentials: true
}

app.use(cors(corsOption))
app.use('/api/db',dbRoute)

app.listen(3000, ()=>{
    console.log(`Server is listening at 3000.`)
})
