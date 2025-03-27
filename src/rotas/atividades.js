const express = require("express");
const router = express.Router();
const db = require("../database"); // Caminho para o seu arquivo de conexão com o banco

// Criar nova atividade
router.post("/", async (req, res) => {
  const { titulo, icon, nordem } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO atividades (titulo, icon, nordem) VALUES ($1, $2, $3) RETURNING *",
      [titulo, icon, nordem]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
    res.status(500).json({ message: "Erro interno ao criar atividade" });
  }
});

// Listar todas
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM atividades ORDER BY nordem ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar atividades" });
  }
});

module.exports = router;
