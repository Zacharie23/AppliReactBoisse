import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenirBD, sauvegarderBD } from "../../donnees/baseDeDonnees";

export default function FormulaireProduit() {
  const { id } = useParams();
  const naviguer = useNavigate();
  const bd = obtenirBD();

  const produitExistant = id ? bd.produits.find((p) => p.id === parseInt(id)) : null;

  const [nom, setNom] = useState(produitExistant?.nom || "");
  const [prix, setPrix] = useState(produitExistant?.prix || "");
  const [stock, setStock] = useState(produitExistant?.stock || "");
  const [categorie, setCategorie] = useState(produitExistant?.categorie || "");

  function gererSoumission(e) {
    e.preventDefault();
    const nouvelleBd = { ...bd };

    if (produitExistant) {
      nouvelleBd.produits = bd.produits.map((p) =>
        p.id === parseInt(id) ? { ...p, nom, prix: parseFloat(prix), stock: parseInt(stock), categorie } : p
      );
    } else {
      const nouvelId = bd.produits.length > 0 ? Math.max(...bd.produits.map((p) => p.id)) + 1 : 1;
      nouvelleBd.produits = [...bd.produits, { id: nouvelId, nom, prix: parseFloat(prix), stock: parseInt(stock), categorie }];
    }

    sauvegarderBD(nouvelleBd);
    naviguer("/produits");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{produitExistant ? "Modifier le produit" : "Ajouter un produit"}</h1>
      <form onSubmit={gererSoumission}>
        <div>
          <label>Nom</label><br />
          <input value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Prix (€)</label><br />
          <input value={prix} onChange={(e) => setPrix(e.target.value)} type="number" step="0.01" required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Stock</label><br />
          <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Catégorie</label><br />
          <input value={categorie} onChange={(e) => setCategorie(e.target.value)} required />
        </div>
        <button style={{ marginTop: "15px" }} type="submit">
          {produitExistant ? "Enregistrer" : "Ajouter"}
        </button>
        <button style={{ marginTop: "15px", marginLeft: "10px" }} type="button" onClick={() => naviguer("/produits")}>
          Annuler
        </button>
      </form>
    </div>
  );
}