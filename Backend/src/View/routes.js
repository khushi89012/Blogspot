const router = require('../Controller/user.controller')
const express = require('express')
const route = express.Router()
const Blog = require('../Models/user.model')

router.get('/get',Blog)
router.post('/post',Blog)
router.put('/update',Blog)
router.delete('/delete',Blog)



module.exports = router