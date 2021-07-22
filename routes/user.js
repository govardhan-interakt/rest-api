const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const excel = require('exceljs')
const xlsx = require('xlsx')
const moment = require('moment')
const { User } = require('../models/user')

// insert users in database
//router.post('/user',userController.user_register)

//get users from data base

router.get('/users',userController.get_all_users)




//search matching user from database

router.get('/search/:name',userController.get_user_ByString)

// Get user of pagination of user list
router.get('/api/user',userController.user_pagination)



//upload profile picture
router.post('/user/upload',userController.user_profile_picture)

//get number of users registered
router.get('/users/countDocuments',userController.users_registered)

//get users registered today
router.get('/users/registered',userController.users_registered_today)



// get list of users in excel file

router.get('/excel',(req,res)=>{
User.find()
    .then(users=>
        {let workbook = new excel.Workbook()
        let worksheet = workbook.addWorksheet('User')
        worksheet.columns=[
            {header:'Id',key:'_id',width:10},
            {header:'Name',key:'name',width:10},
            {header:'Email',key:'email',width:10}
        ]
        worksheet.addRows(users)
    
        workbook.xlsx.writeFile('User.xlsx')
        .then(function(){
            console.log('File saved')
        })})
        res.json({
            message:"file downloaded"
        })

})






//insert users in database

/*const users =[
  

    {name:'user1',email:'user1@gmail.com'},
    {name:'user2',email:'user2@gmail.com'},
    {name:'user3',email:'user3@gmail.com'},
    {name:'user4',email:'user4@gmail.com'},
    {name:'user5',email:'user5@gmail.com'},
    {name:'user6',email:'user6@gmail.com'},

]

users.forEach(function(elem){
    User.create({
        name:elem.name,
        email:elem.email
    })
    
})
*/









module.exports =router