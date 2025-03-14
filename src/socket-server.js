// socket-server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Criar servidor express básico
const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Rota de teste
app.get("/health", (req, res) => {
  res.send({ status: "Socket server running" });
});

// Criar servidor HTTP e Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  path: "/api/socketio",
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 300000, // 5 minutos
  pingInterval: 30000, // 30 segundos
});

// Configurar comportamento Socket.io
io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Impedir desconexões
  const originalDisconnect = socket.disconnect;
  socket.disconnect = function() {
    console.log("Tentativa de desconexão bloqueada");
    return socket;
  };

  // Handler de salas
  socket.on("join", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} entrou na sala: ${room}`);
    socket.emit("joined", { room });
  });

  // Simular handlers de eventos que seu aplicativo precisa
  socket.on("FilaEspera/joinFilaEsperaSocket", () => {
    socket.join("FilaEsperaSocket");
    console.log(`Socket ${socket.id} entrou na FilaEsperaSocket`);
  });

  socket.on("Fone/joinFoneSocket", () => {
    socket.join("FoneSocket");
    console.log(`Socket ${socket.id} entrou na FoneSocket`);
  });

  socket.on("AtendimentosOnline/joinAtendimentosOnlineSocket", () => {
    socket.join("AtendimentosOnlineSocket");
    console.log(`Socket ${socket.id} entrou na AtendimentosOnlineSocket`);
  });

  // Monitorar tentativa de desconexão
  socket.on("disconnecting", (reason) => {
    console.log(`Cliente ${socket.id} tentando desconectar. Motivo: ${reason}`);
  });
});

// Iniciar servidor na porta 3001
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor Socket.io independente rodando na porta ${PORT}`);
});
