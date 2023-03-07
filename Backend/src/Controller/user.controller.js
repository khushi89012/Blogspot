const express = require('express')
const route = express.Router()
const Blog = require('../Models/user.model')



route.get("/",async (req,res)=>{
     try{
        const data = await  Blog.find().lean().exec()
        res.status(200).send({
         status:"Success",
         data:data
        })
        
     }
     catch(err){
      res.status(400).send({err:err.message})
     }

   })

   route.post("/",async (req,res)=>{
      try{

         const blog = await Blog.create(req.body)
         res.status(200).send(blog)
      }
      catch(err){
         res.send(404).send({err:err.message})
      }
   })

   route.patch('/:id',async (req,res)=>{
      try{
         const data = await Blog.findByIdAndUpdate(req.params.id,{new:true})
         res.status(200).send(data,{
            message:`data has updated succesfully at ${Date.now()}`
         })
      }
         catch(err){
            res.status(500).send({err:err.message})
         }
      
   })

   route.delete('/:id',async (req,res)=>{
      try{
         const data = await Blog.findByIdAndDelete(req.params.id)
         res.status(200).send({
            message:"The Data has been deleted",
            data:data})
      }
      catch(err){
         res.status(404).send({err:err.message})
      }
   })






   module.exports = route