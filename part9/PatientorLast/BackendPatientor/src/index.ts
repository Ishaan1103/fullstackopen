import express from "express"
import cors from "cors"


const PORT = 3001
const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get('/api/ping',(_req,res)=>{
    res.send("pong")
})
//import Routes
import diagnosisRoute from "./routes/diagnosis"
//routing middleware 
app.use('/api/',diagnosisRoute)

app.listen(PORT,()=>{
    console.log(`listening at ${PORT}`);
})