const express = require('express')
const router = express.Router()
const db = require('../config/db')
const excel = require('exceljs')
const multer = require('multer')
const path = require('path')

const {User}= require('../models/user')


exports.get_all_users= async (req,res)=>{
    
        const users = await User.find()
        .then(users=>{
            return res.send(users)
        })
        
    .catch(err=>{
        res.status(500).send(err)
    })
}


exports.get_user_ByString =(req,res)=>{
    const regex = new RegExp(req.params.name,'i')
    User.find({name:regex})
    .then((users)=>{
       return res.status(200).json(users)
    }).catch(err=>{
        res.status(500).send(err)
    })
}

exports.user_pagination =async (req,res)=>{
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
}

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
exports.user_profile_picture=upload.single('profile'),async(req,res)=>{
    try{
    res.json({
        success:1,
        profile_url:`http://localhost:4545/profile/${req.file.filename}`

    })
}catch(error){
    
    res.status(500).send(error.message)
}
}

exports.users_registered=(req,res)=>{
    User.countDocuments()
    .then((count)=>{
    console.log(count)
      return res.json(count)
        
    }).catch(err=>{
        error:err
    })
}


exports.users_registered_today=async(req,res)=>{

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
}
