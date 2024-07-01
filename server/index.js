const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ['GET','POST','PUT','DELETE']
}))

const port = 5000
mongoose.connect(process.env.MONGODB_URI).then(console.log("db connected")).catch("db not connected")

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})