const express = require('express')
const Connect = require('./src/config/dbconfig')
const app = express()
const Blog = require('./src/View/routes')
const register = require("./src/View/register")
const login = require('./src/View/login')
require('dotenv').config()
app.use(express.json())

app.use('/',Blog)
app.use('/login',login)
app.use('/auth',register)

const Port = process.env.PORT

app.listen(Port,()=>{
    Connect
    console.log("Server is listening on Port 9000")
})