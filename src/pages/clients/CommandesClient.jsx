import { useParams, useNavigate } from "react-router-dom";
import { obtenirBD } from "../../donnees/baseDeDonnees";

export default function CommandesClient() {
  const { id } = useParams();
  const naviguer = useNavigate();
  const bd = obtenirBD();

  const client = bd.clients.find((c) => c.id === parseInt(id));
  const commandesDuClient = bd.commandes.filter((cmd) => cmd.idClient === parseInt(id));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Commandes de {client?.nom}</h1>
      <button onClick={() => naviguer("/clients")}>Retour</button>
      {commandesDuClient.length === 0 ? (
        <p>Aucune commande pour ce client.</p>
      ) : (
        <table border="1" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th><th>Date</th><th>Statut</th><th>Produits</th>
            </tr>
          </thead>
          <tbody>
            {commandesDuClient.map((commande) => (
              <tr key={commande.id}>
                <td>{commande.id}</td>
                <td>{commande.date}</td>
                <td>{commande.statut}</td>
                <td>
                  {commande.produits.map((p) => {
                    const produitTrouve = bd.produits.find((prod) => prod.id === p.idProduit);
                    return <div key={p.idProduit}>{produitTrouve?.nom} x{p.quantite}</div>;
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}