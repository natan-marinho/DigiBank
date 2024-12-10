const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lista todos os usuários
router.get('/users', userController.getAllUsers);

// Cria um novo usuário
router.post('/users', userController.createUser);

// Login de usuário
router.post('/users/login', userController.loginUser);

// Obtém o saldo de um usuário
router.get('/users/:id/balance', userController.getUserBalance);

// Atualiza o saldo de um usuário após uma operação
router.post('/users/update-balance', userController.updateUserBalance);

module.exports = router;
