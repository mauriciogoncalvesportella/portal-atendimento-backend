const express = require("express");
const cors = require("cors");
const app = express();
const atividadesRouter = require("./rotas/atividades"); // ajuste o caminho se necessário

// Detecta ambiente
const isProduction = process.env.NODE_ENV === "production";

// Lista de origens permitidas
const allowedOrigins = isProduction
  ? ["https://seu-dominio-de-producao.com"]
  : ["http://localhost:8080", "https://192.168.15.109:8080"];

// Middleware CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Não permitido pelo CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400, // 24 horas
  })
);

// Middleware para aceitar JSON
app.use(express.json());

// Rotas de atividades
app.use("/api/atividades", atividadesRouter);

// Middleware de tratamento de erro do CORS
app.use((err, req, res, next) => {
  if (err.message === "Não permitido pelo CORS") {
    return res.status(403).json({
      status: "erro",
      message: "Acesso não autorizado",
    });
  }
  next(err);
});

// Outras rotas existentes
app.get("/api/agenda/tipo-agendamento/all", (req, res) => {
  // Seu código aqui
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});
