const userController = require('../controller/userController.js')
const express = require('express');
const router = express.Router();
const { loginController } = require('../controller/loginController');


router.post('/user/create', userController.addUser)
router.get('/user/getAll', userController.getUsers)
router.put('/user/edit', userController.updateUser)
router.delete('/user/delete', userController.deleteUser)
router.put('/user/uploadImage', userController.uploadImage)
router.post('/company/create', userController.addCompany)
router.get('/company/getAll', userController.getAllCompanies)
router.post('/create/job', userController.createJob)
router.get('/get/jobs', userController.getJobs)
router.post('/login', loginController)


module.exports = router;
