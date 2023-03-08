const express = require("express");
const {validateBody,schemas}= require("../helpers/userValidate")
const passport = require("passport")
require("../../passportconfig")
const router = express.Router();
const passportRegister =passport.authenticate('local-signup', { session: false })

router.post("/register",validateBody(schemas.registerSchema),passportRegister,(req,res,next)=>{
    // console.log("req",req)
    res.json({user:"register successfully"})})



module.exports = router;