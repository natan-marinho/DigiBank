const connection = require('../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = (req, res) => {
    connection.query('SELECT id, email, balance, created_at FROM Users', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
        }
        res.status(200).json(results);
    });
};

const createUser = (req, res) => {
    const { email, password } = req.body;
    
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao processar senha', error: err });
        }

        connection.query(
            'INSERT INTO Users (email, password) VALUES (?, ?)',
            [email, hashedPassword],
            (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: 'Email já cadastrado' });
                    }
                    return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
                }
                res.status(201).json({ id: results.insertId, email });
            }
        );
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    connection.query(
        'SELECT * FROM Users WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).json({ message: 'Credenciais inválidas' });
                }

                // Retorna apenas o ID do usuário
                res.json({ id: results[0].id });
            });
        }
    );
};


const getUserBalance = (req, res) => {
    const { id } = req.params;
    
    connection.query(
        'SELECT balance FROM Users WHERE id = ?',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao buscar saldo', error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.json({ balance: results[0].balance });
        }
    );
};

const updateUserBalance = (req, res) => {
    const { user_id, value, type } = req.body;

    // Primeiro, buscar o saldo atual
    connection.query(
        'SELECT balance FROM Users WHERE id = ?',
        [user_id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao buscar saldo atual', error: err });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const currentBalance = parseFloat(results[0].balance);
            const operationValue = parseFloat(value);
            
            // Calcular novo saldo
            let newBalance;
            if (type === 'entrada') {
                newBalance = currentBalance + operationValue;
            } else if (type === 'saida' || type === 'transferencia') { // Incluindo transferência aqui
                // Verifica se há saldo suficiente
                if (currentBalance < operationValue) {
                    return res.status(400).json({ message: 'Saldo insuficiente para esta operação' });
                }
                newBalance = currentBalance - operationValue;
            } else {
                return res.status(400).json({ message: 'Tipo de operação inválido' });
            }

            // Atualizar com o novo saldo calculado
            connection.query(
                'UPDATE Users SET balance = ? WHERE id = ?',
                [newBalance, user_id],
                (updateErr, updateResults) => {
                    if (updateErr) {
                        return res.status(500).json({ message: 'Erro ao atualizar saldo', error: updateErr });
                    }

                    res.status(200).json({
                        message: 'Saldo atualizado com sucesso',
                        oldBalance: currentBalance,
                        newBalance: newBalance,
                        difference: type === 'entrada' ? operationValue : -operationValue
                    });
                }
            );
        }
    );
};


module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getUserBalance,
    updateUserBalance
};