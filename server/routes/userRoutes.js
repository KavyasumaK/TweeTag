const express = require('express');

const permissionController = require('../Controller/permissionController');
const userController = require('../Controller/userController');

//Router-level middleware definition
const router = express.Router();

//permission paths
router.post('/signup',permissionController.signup);
router.post('/login',permissionController.login);
router.get('/logout', permissionController.logout);
router.get('/userexists', permissionController.protect, permissionController.userExists);


//user paths
router.get('/mytags', permissionController.protect, userController.getMyTags);

module.exports = router; 