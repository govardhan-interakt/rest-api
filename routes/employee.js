const express = require('express')
const router = express.Router()
const { employee } = require('../models/employee')
const employeeController = require('../controllers/employee')


//register employee in database
router.post('/employee',employeeController.register_employees)

//login employees

router.post('/employee/login',employeeController.employee_login)

//Get employee details from db
router.get('/employees',employeeController.get_employees)

//get one employee
router.get('/employee/:id',employeeController.get_employee_Byid)

module.exports=router