const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.post("/signup", authController.createUser);

router.post("/signin", authController.signinUser);


module.exports = router
