const express = require('express');
const router = express.Router();

// FIX: Use curly braces { } to import the specific function
const { chatBotController } = require("../controller/chatBotCntroller");

router.post('/chatbot', chatBotController);

module.exports = router;
