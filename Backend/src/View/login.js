const express = require("express");
const passport = require("passport");
const passprotLogin = passport.authenticate('local-login',{session:false})
const loginController = require("../Controller/lgoin")



const router = express.Router();

router.post("/login",passprotLogin,loginController.login)

module.exports = router;