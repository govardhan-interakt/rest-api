const express = require('express')
const router = express.Router()




const {User}= require('../models/user')


// add user to database
router.post('/api/user/add',async (req,res) =>{
    try{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
    user.save((err,data)=>{
        if(!err){
        res.status(200).json({code:200,message:'User added successfully',addUser:data})
        } else{
            res.status(400).json({code:400,message:'User not added',addUser:err})
        }
    })
    } catch(error){
        res.status(500).send(error.message)
    }
})



//Get all users

router.get('/users',async (req,res)=>{
    try{
        const users = await User.find()
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


module.exports = router