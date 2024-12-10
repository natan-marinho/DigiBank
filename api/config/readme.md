// DATABASE SCHEMA

CREATE DATABASE digibank;
USE digibank;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único do usuário
    email VARCHAR(255) NOT NULL UNIQUE, -- Email único para cada usuário
    password VARCHAR(255) NOT NULL, -- Senha criptografada
    balance DECIMAL(15, 2) DEFAULT 0.00, -- Saldo inicial como decimal (ex: R$ 0,00)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de criação do registro
);

CREATE TABLE Extract (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único da ação
    user_id INT NOT NULL, -- Chave estrangeira para a tabela Users
    action_name VARCHAR(255) NOT NULL, -- Nome da ação (ex: "Supermercado", "Salário")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora da transação
    value DECIMAL(15, 2) NOT NULL, -- Valor da transação (ex: R$ 150,00)
    type ENUM('entrada', 'saida', 'transferencia') NOT NULL, -- Tipo da transação
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE -- Relacionamento com Users
);

