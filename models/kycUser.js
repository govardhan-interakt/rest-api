const mongoose = require('mongoose')
const validator = require('validator')

const kycUserSchema=new mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
      
        age:{
            type:Number,
            validate(value){
                if (value < 0){
                    throw new Error('Age must be a positive number')
                }
            }
        },
        address:{
            type:String,
            required:true  
        },
        DOB:{
           type:Date,
           required:true,
           trim:true
        },
        date:Date
    

    }
)
const kycUser= mongoose.model('kycUser',kycUserSchema)
module.exports = {kycUser}