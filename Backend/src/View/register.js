const express = require("express");
const {validateBody,schemas}= require("../helpers/userValidate")
const passport = require("passport")
require("../../passportconfig")
const router = express.Router();
const passportRegister =passport.authenticate('local-signup', { session: false })

router.post("/register",validateBody(schemas.registerSchema),passportRegister)



module.exports = router;