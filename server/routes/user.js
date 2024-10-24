const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');


router.get('/users', UserController.getAllUsers);
router.post('/addUser', UserController.createUser);
router.delete('/users/:userId', UserController.deleteUser);
router.put('/users/:userId', UserController.updateUser);

module.exports = router;