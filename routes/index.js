const express = require('express')
const router = express.Router()
const db = require('../config/db')

const multer = require('multer')
const path = require('path')

const {User}= require('../models/user')
const {kycUser}=require('../models/kycUser')
const { employee } = require('../models/employee')
const { endianness } = require('os')


//insert array of objects in database
router.post('/users',(req,res)=>{

    User.insertMany(req.body).then((users)=>{
        res.status(201).send(users)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})

//get users from data base

router.get('/users',async (req,res)=>{
    try{
        const users = await User.find()
        res.send(users)
    } catch(error){
        res.status(500).send(error.message)
    }
})

// insert array of objects in new collection 

router.post('/kycUser',(req,res)=>{
    
    kycUser.create(req.body).then((kycUser)=>{
        res.status(201).send(kycUser)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})
// Get user with kyc
router.get('/kycUser',async (req,res)=>{
    try{
        const users = await kycUser.find()
        res.send(users)
    } catch(error){
        res.status(500).send(error.message)
    }
})


//Get single user
router.get('/api/user/:id',(req,res)=>{
    User.findById(req.params.id,(err,data)=>{
        if(!err){
            res.send(data)
        } else {
            console.log(err)
        }
    })
})

//search matching user from database

router.get('/search/:name',(req,res)=>{
    const regex = new RegExp(req.params.name,'i')
    User.find({name:regex}).then((users)=>{
        res.status(200).json(users)
    })
})


// Get user of pagination of user list

router.get('/api/user',async (req,res)=>{
    try{
    let {page,size} = req.query
    if(!page){
        page = 1
    }
    if(!size){
        size = 10
    }
    const limit = parseInt(size)
    const skip = (page -1)*size
    const users = await User.find().limit(limit).skip(skip)
    res.send(users)

    } catch (error){
        res.status(500).send(error.message)
    }
})

//update user
router.put('/api/user/edit/:id',(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
})
    User.findByIdAndUpdate(req.params.id,{$set:user},{new:true},(err,data)=>{
        if(!err){
            res.status(200).json({ code:200,message:'User updated Successfully',updateUser:data})

        } else {
            console.log(err)
        }
    })
})

// Storage engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer(
    {
      storage:storage ,
      limits:{
          filesize:1000000
      } 
    }
)
//upload profile picture
router.post('/upload',upload.single('profile'),async(req,res)=>{
    try{
    res.json({
        success:1,
        profile_url:`http://localhost:4545/profile/${req.file.filename}`

    })
}catch(error){
    
    res.status(500).send(error.message)
}
})

// get number of users
router.get('/countDocuments',(req,res)=>{
    User.countDocuments().then((count,err)=>{
        if(err){
            res.status(401)
        }
        else{
            res.json(count)
        }
    })
})
// get number of users with kyc data
router.get('/countDocuments',(req,res)=>{
    kycUser.countDocuments().then((count,err)=>{
        if(err){
            res.status(401)
        }
        else{
            res.json(count)
        }
    })
})

//register employee in database
router.post('/employee',async(req,res)=>{

    const user =new employee(req.body)
    try {
    await  user.save()
        res.status(201).send(user)
    } catch (error){
        res.status(400).send(error.message)
    }
    
})

//login employees

router.post('/employee/login',async (req,res)=>{
    try{
        const user = await employee.findByCredentials(req.body.email,req.body.password)
    
        res.send(user)

    }catch(error){
        res.status(400).send(error.message)
    }
})
//Get employee details from db
router.get('/employees',async (req,res)=>{
    try{
        const users = await employee.find()
        res.send(users)
    } catch(error){
        res.status(500).send(error.message)
    }
})
//get one employee
router.get('/employee/:id',(req,res)=>{
    employee.findById(req.params.id,(err,data)=>{
        if(!err){
            res.send(data)
        } else {
            console.log(err)
        }
    })
})



//get users registered today
router.get('/em',async(req,res)=>{

    let{startDate,endDate}=req.body;

    if(startDate === ''|| endDate === ''){
        return res.status(400).json({
            status:'failure',
            message:'ensure date'
        })
    }
    console.log({startDate,endDate})


 const users= employee.find({
    date:{
        $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
        $it: new Date(new Date(endDate).setHours(23, 59, 59))
    }
}).sort({date:'asc'})

res.send(users)
if(!users){
    res.status(404).json({
        status:'failure',
        message:'could not rfetreive data'
    })
}else{
    res.status(200).json({
        status:'success',
        data:users
    })
}
})


// get number of users
router.get('/countDocuments',(req,res)=>{
    User.countDocuments().then((count,err)=>{
        if(err){
            res.status(401)
        }
        else{
            res.json(count)
        }
    })
})
// get number of users with kyc data
router.get('/countDocuments',(req,res)=>{
    kycUser.countDocuments().then((count,err)=>{
        if(err){
            res.status(401)
        }
        else{
            res.json(count)
        }
    })
})






module.exports = router