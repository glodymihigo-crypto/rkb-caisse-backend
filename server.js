import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route test
app.get("/api", (req, res) => {
  res.json({ message: "RKB Caisse API fonctionne 🔥" });
});

// Route operations
app.get("/operations", (req, res) => {
  res.json([
    { id: 1, type: "entrée", montant: 5000 },
    { id: 2, type: "sortie", montant: 2000 }
  ]);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
