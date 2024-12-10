require('dotenv').config(); // Carrega as variáveis de ambiente

const mysql = require('mysql2');

// Conexão com o banco de dados usando as variáveis de ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST,  // Usando as variáveis do .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Testa a conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = connection;
