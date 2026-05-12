const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const { createAddress, getAddressById, getUserAddresses } = require('../controller/addressController');

const router = express.Router();

router.post('/', authMiddleware, createAddress);
router.get('/:addressId', authMiddleware, getAddressById);
router.get('/', authMiddleware, getUserAddresses);

module.exports = router;
