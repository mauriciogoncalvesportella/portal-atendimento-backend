// Adicione esta configuração no início do seu arquivo principal do servidor API
// (geralmente app.js, index.js, server.js ou similar)
const express = require("express");
const cors = require("cors");
// ... outras importações que você já tenha

const app = express();

// Configuração CORS para ambiente de produção
const isProduction = process.env.NODE_ENV === "production";

// Lista de origens permitidas
const allowedOrigins = isProduction
  ? ["https://seu-dominio-de-producao.com"] // Origens de produção
  : ["http://localhost:8080", "https://192.168.15.109:8080"]; // Origens de desenvolvimento

// Configuração CORS - deve ser uma das primeiras middlewares
app.use(
  cors({
    origin: function(origin, callback) {
      // Permitir requisições sem origem (como apps mobile ou curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`Origem bloqueada pelo CORS: ${origin}`);
        callback(new Error("Não permitido pelo CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    // Tempo em segundos que o navegador pode cachear a resposta do preflight
    maxAge: 86400, // 24 horas
  })
);

// Middleware de tratamento de erros para CORS
app.use((err, req, res, next) => {
  if (err.message === "Não permitido pelo CORS") {
    return res.status(403).json({
      status: "erro",
      message: "Acesso não autorizado",
    });
  }
  next(err);
});

// Resto do seu código de servidor...

// Exemplo de rotas
app.get("/api/agenda/tipo-agendamento/all", (req, res) => {
  // Seu código para esta rota
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `API server running on port ${PORT} in ${process.env.NODE_ENV ||
      "development"} mode`
  );
});
