const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // Para segurança adicional
const morgan = require('morgan'); // Para logging
const rateLimit = require('express-rate-limit'); // Para limitar requisições

const app = express();

// Configurações de segurança básicas
app.use(helmet());

// Configuração de CORS mais específica
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600 // 10 minutos
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requisições por windowMs
});
app.use(limiter);

// Logging
app.use(morgan('dev'));

// Parse do body com limite de tamanho
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

// Rotas
const userRoutes = require('../routes/userRoute');
const extractRoutes = require('../routes/extractRoute');

app.use('/api', userRoutes);
app.use('/api', extractRoutes);

// Middleware de tratamento de erro 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Configuração do servidor
const PORT = process.env.PORT || 3001;

// Tratamento de erros na inicialização do servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Tratamento gracioso de desligamento
process.on('SIGTERM', () => {
    console.log('SIGTERM recebido. Fechando servidor HTTP...');
    server.close(() => {
        console.log('Servidor HTTP fechado.');
        process.exit(0);
    });
});

module.exports = app;