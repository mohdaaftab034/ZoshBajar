const express = require('express');
const homeCategoryController = require('../controller/homeCategoryController');

const router = express.Router();

router.post('/categories', homeCategoryController.createHomeCategories);

router.post('/home-category', homeCategoryController.createHomeCategory);

router.get('/home-category', homeCategoryController.getHomeCategory);

router.patch('/home-category/:id', homeCategoryController.updateHomeCategory);


module.exports = router;
