const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        })
        console.log('mongodb connected')
    }catch(err){
        console.log(err)
    }
}


module.exports = connectDB