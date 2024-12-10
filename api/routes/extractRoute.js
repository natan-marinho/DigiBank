const express = require('express');
const router = express.Router();
const extractController = require('../controllers/extractController');

router.get('/extracts', extractController.getAllExtracts);          // Lista todos os extratos
router.get('/extracts/user/:user_id', extractController.getExtractByUser); // Lista extratos de um usuário
router.post('/extracts', extractController.createExtract);


module.exports = router;