const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { kycUser}= require('../models/kycUser')
const {User}=require('../models/user')


exports.create_kycUser=(req,res)=>{

    const kycuser ={
        _id:mongoose.Types.ObjectId(),
        age:req.body.age,
        address:req.body.address,
        DOB:req.body.DOB,
        user:req.body.userId
    }
    kycUser.create(kycuser)
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })

}


exports.get_kycUsers=(req,res)=>{
    kycUser.find()
    .populate('user')
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

}