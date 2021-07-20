const express = require('express')
const morgan =require('morgan')
const createError = require('http-errors')
const bodyParser = require('body-parser')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()
app.use(bodyParser.json())


/*app.use(async(req,res,next)=>{
    const error = new Error('Not found')
    error.status =404
    next(error)
})
app.use((err,req,res,next)=>{
res.status(err.status || 500)
res.send({
    error:{
        status:err.status || 500,
        message:err.message
    }
})
}*/
//Routes
const userRoutes = require('./routes/user')
const employeeRoutes =require('./routes/employee')


app.use('/',userRoutes)
app.use('/',employeeRoutes)


connectDB()


const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Listening: http://localhost:${PORT}`)
})