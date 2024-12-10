const connection = require('../config/connection');

const getAllExtracts = (req, res) => {
    connection.query('SELECT * FROM Extract ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Erro ao buscar extratos:', err);
            return res.status(500).json({ message: 'Erro ao buscar extratos', error: err.message });
        }
        res.status(200).json(results);
    });
};

const getExtractByUser = (req, res) => {
    const { user_id } = req.params;
    
    if (!user_id) {
        return res.status(400).json({ message: 'ID do usuário é obrigatório' });
    }
    
    connection.query(
        'SELECT * FROM Extract WHERE user_id = ? ORDER BY created_at DESC',
        [user_id],
        (err, results) => {
            if (err) {
                console.error('Erro ao buscar extrato do usuário:', err);
                return res.status(500).json({ message: 'Erro ao buscar extrato', error: err.message });
            }
            res.status(200).json(results);
        }
    );
};

const createExtract = (req, res) => {
    const { user_id, action_name, value, type } = req.body;

    // Usando backtics (`) para escapar o nome da tabela Extract
    connection.query(
        'INSERT INTO `Extract` (`user_id`, `action_name`, `value`, `type`) VALUES (?, ?, ?, ?)',
        [user_id, action_name, value, type],
        (err, results) => {
            if (err) {
                console.error('Erro ao criar extrato:', err);
                return res.status(500).json({ message: 'Erro ao criar extrato', error: err.message });
            }
            
            res.status(201).json({
                id: results.insertId,
                user_id,
                action_name,
                value,
                type,
                message: 'Extrato criado com sucesso'
            });
        }
    );
};

module.exports = {
    getAllExtracts,
    getExtractByUser,
    createExtract
};