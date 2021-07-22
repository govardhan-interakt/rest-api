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
        required:true,
        //sparse:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ('email is invalid')
            }
        }
    }
   

})
const User= mongoose.model('User',userSchema)


module.exports = {User}