const mongoose = require('mongoose')
require('dotenv').config()
const Mongo = process.env.MONGO_URI;


module.exports= mongoose.connect(Mongo)
.then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log("this is error ",err.message)
})