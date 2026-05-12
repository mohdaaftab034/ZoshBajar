const express = require('express');
const dealController = require('../controller/dealController');

const router = express.Router();

router.get('/', dealController.getAllDeals);

router.post('/', dealController.createDeals);

router.patch('/:id', dealController.updateDeal);

router.delete('/:id', dealController.deleteDeal);


module.exports = router;
