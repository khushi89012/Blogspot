const express = require('express')
const Connect = require('./src/config/dbconfig')
const app = express()
const Blog = require('./src/View/routes')
require('dotenv').config()
app.use(express.json())

app.use('/',Blog)

const Port = process.env.PORT

app.listen(Port,()=>{
    Connect
    console.log("Server is listening on Port 9000")
})