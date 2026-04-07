import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenirBD, sauvegarderBD } from "../../donnees/baseDeDonnees";

export default function ListeProduits() {
  const [bd, setBd] = useState(obtenirBD());
  const naviguer = useNavigate();

  function supprimerProduit(id) {
    const nouvelleBd = { ...bd, produits: bd.produits.filter((p) => p.id !== id) };
    sauvegarderBD(nouvelleBd);
    setBd(nouvelleBd);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Produits</h1>
      <button onClick={() => naviguer("/produits/nouveau")}>+ Ajouter un produit</button>
      <table border="1" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nom</th><th>Prix</th><th>Stock</th><th>Catégorie</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bd.produits.map((produit) => (
            <tr key={produit.id}>
              <td>{produit.nom}</td>
              <td>{produit.prix} €</td>
              <td>{produit.stock}</td>
              <td>{produit.categorie}</td>
              <td>
                <button onClick={() => naviguer(`/produits/modifier/${produit.id}`)}>Modifier</button>
                <button onClick={() => supprimerProduit(produit.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}