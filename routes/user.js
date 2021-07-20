const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const excel = require('exceljs')
const xlsx = require('xlsx')
const moment = require('moment')
const { User } = require('../models/user')

// insert users in database
router.post('/user',userController.user_register)

//get users from data base

router.get('/users',userController.get_all_users)


//Get single user
router.get('/api/user/:id',userController.user_register)

//search matching user from database

router.get('/search/:name',userController.get_user_ByString)

// Get user of pagination of user list
router.get('/api/user',userController.user_pagination)




// Storage engine

//upload profile picture
router.post('/user/upload',userController.user_profile_picture)

//get number of users registered
router.get('/users/countDocuments',userController.users_registered)

//get users registered today
router.get('/users/registered',userController.users_registered_today)

router.get('/sheet',async(req,res,next)=>{
    const startDate = moment(new Date()).startOf('month').toDate()
    const endDate = moment(new Date()).endOf('month').toDate()
    try{
        const users = await User.find({created_at:{$gte:startDate,$lte:endDate}})
        const workbook =new exceljs.Workbook()
        const worksheet = workbook.addworksheet('My Users')
        worksheet.columns=[
            {header:'S.no',Key:'S.no',width:10},
            {header:'Name',Key:'name',width:10},
            {header:'Email',Key:'email',width:10},
            {header:'Age',Key:'age',width:10},
            {header:'Address',Key:'address',width:10},
            {header:'DOB',Key:'DOB',width:10}
        ]
        let count =1
        users.forEach(user=>{
            user.s.no = count
            worksheet.addRow(user)
            count+=1
        })
        worksheet.getRow(1).eachCell((cell)=>{
            cell.font={bold:true}
        })
        const data = await workbook.xlsx.writeFile('users.xlsx')
        res.send('done')
    }catch(e){
        res.status(500).send
    }
})







module.exports =router