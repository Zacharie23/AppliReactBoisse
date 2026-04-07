import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenirBD, sauvegarderBD } from "../../donnees/baseDeDonnees";

export default function ListeCommandes() {
  const [bd, setBd] = useState(obtenirBD());
  const naviguer = useNavigate();

  function supprimerCommande(id) {
    const nouvelleBd = { ...bd, commandes: bd.commandes.filter((c) => c.id !== id) };
    sauvegarderBD(nouvelleBd);
    setBd(nouvelleBd);
  }

  function obtenirNomClient(idClient) {
    return bd.clients.find((c) => c.id === idClient)?.nom || "Inconnu";
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Commandes</h1>
      <button onClick={() => naviguer("/commandes/nouvelle")}>+ Ajouter une commande</button>
      <table border="1" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th><th>Client</th><th>Date</th><th>Statut</th><th>Produits</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bd.commandes.map((commande) => (
            <tr key={commande.id}>
              <td>{commande.id}</td>
              <td>{obtenirNomClient(commande.idClient)}</td>
              <td>{commande.date}</td>
              <td>{commande.statut}</td>
              <td>
                {commande.produits.map((p) => {
                  const produit = bd.produits.find((prod) => prod.id === p.idProduit);
                  return <div key={p.idProduit}>{produit?.nom} x{p.quantite}</div>;
                })}
              </td>
              <td>
                <button onClick={() => naviguer(`/commandes/modifier/${commande.id}`)}>Modifier</button>
                <button onClick={() => supprimerCommande(commande.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}