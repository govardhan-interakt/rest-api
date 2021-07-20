const mongoose = require('mongoose')
const validator = require('validator')

//User Schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ('email is invalid')
            }
        }
    },
    age:{
        type:Number,
        required:true,
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
    }

})
const User= mongoose.model('User',userSchema)


module.exports = {User}