const express = require('express')
const router = express.Router()
const db = require('../config/db')
const { employee } = require('../models/employee')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register_employees=(req,res,next)=>{
    employee.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:'Mail exists'
            })
        }else{
                    const user =new employee(req.body)
                    
                    user.save()
                    .then(result=>{
                        res.status(201).json({
                            message:'User created',
                            employee:user
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            
    
    })
    
  
}

exports.employee_login=(req,res,next)=>{
    employee.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.lenght<1){
            return res.status(401).json({
                message:'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Auth failed'
                })
            }
            if(result){
                const token = jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn:'1h'
                }
                )
                return res.status(200).json({
                    message:'Auth Successful',
                    token:token
                })
            }
            return res.status(401).json({
                message:'Auth failed'
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

exports.get_employees=async (req,res)=>{
    try{
        const users = await employee.find()
        res.send(users)
    } catch(error){
        res.status(500).send(error.message)
    }
}
exports.get_employee_Byid=(req,res)=>{
    employee.findById(req.params.id,(err,data)=>{
        if(!err){
            res.send(data)
        } else {
            console.log(err)
        }
    })
}


    
  