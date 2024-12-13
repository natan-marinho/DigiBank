
# DigiBank

<div align="center">
  <img src="./banner.svg" alt="DigiBank Banner" width="800"/>
</div>

Sistema bancário digital desenvolvido com React e Node.js.

## 🚀 Instalação

### Pré-requisitos
- Node.js
- MySQL

### Frontend
```bash
cd frontend
npm install
```

### API
```bash
cd api
npm install
cp .env.example .env
```

## ⚙️ Configuração

1. Configure o banco de dados seguindo o script em `api/config/readme.md`
2. Configure as variáveis de ambiente:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=digibank
```

## 💻 Execução

### API
```bash
cd api
npm start
```

### Frontend
```bash
cd frontend
npm run dev
```

Acesse:
- API: `http://localhost:3001`
- Frontend: `http://localhost:3000`

## 🛠️ Tecnologias
- React
- Node.js
- MySQL
- Express

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
