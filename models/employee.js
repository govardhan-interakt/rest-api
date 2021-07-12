const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

//User Schema

const employeeSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true, 
        minlenght:7,
        trim:true,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')
            }
        }
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

})

employeeSchema.statics.findByCredentials= async(email,password)=>{
    const user = await employee.findOne({email})
    if(!user){
        throw new Error ('unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}
employeeSchema.pre('save',async function(next){
    const user =this
if(user.isModified('password')){
    user.password =await bcrypt.hash(user.password,11)

}
    next()
})

const employee= mongoose.model('employee',employeeSchema)


module.exports = {employee}