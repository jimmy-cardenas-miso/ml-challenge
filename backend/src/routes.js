const express = require('express');
const router = express.Router();

const itemService = require('./services/item.service');
const validator = require('./middlewares/item.middleware');

router.get('/items', validator.notEmptyQuery, itemService.getByQuery);
router.get('/items/:id', validator.notEmptyId, itemService.getById);

module.exports = router;
