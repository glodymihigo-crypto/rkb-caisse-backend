import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser le frontend GitHub Pages
app.use(cors({
  origin: "*"
}));

// Lire le JSON envoyé
app.use(express.json());

// 🔥 Données stockées en mémoire (pas de base de données)
let operations = [];
let nextId = 1;

// 👉 Route test
app.get("/", (req, res) => {
  res.json({ message: "Backend RKB Caisse opérationnel 🔥" });
});

// 👉 Récupérer toutes les opérations
app.get("/operations", (req, res) => {
  res.json(operations);
});

// 👉 Ajouter une opération
app.post("/operations", (req, res) => {
  const {
    date,
    libele,
    quantite,
    prix,
    total,
    sortie,
    vente_jour,
    obs
  } = req.body;

  const solde = total - sortie;

  const newOp = {
    id: nextId++,
    date,
    libele,
    quantite,
    prix,
    total,
    sortie,
    solde,
    vente_jour,
    obs
  };

  operations.push(newOp);

  res.json({ message: "Opération ajoutée", data: newOp });
});

// 👉 Supprimer une opération
app.delete("/operations/:id", (req, res) => {
  const id = Number(req.params.id);

  operations = operations.filter(op => op.id !== id);

  res.json({ message: "Opération supprimée", id });
});

// 👉 Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur RKB Caisse démarré sur le port ${PORT}`);
});
