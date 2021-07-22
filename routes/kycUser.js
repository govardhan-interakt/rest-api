const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { kycUser } = require('../models/kycUser')
const { User } = require('../models/user')

const kycUsercontroller = require('../controllers/kycUser')


router.post('/kycUser',kycUsercontroller.create_kycUser)


router.get('/kycUsers',kycUsercontroller.get_kycUsers)













module.exports=router