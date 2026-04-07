import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenirBD, sauvegarderBD } from "../../donnees/baseDeDonnees";

export default function ListeClients() {
  const [bd, setBd] = useState(obtenirBD());
  const naviguer = useNavigate();

  function supprimerClient(id) {
    const nouvelleBd = { ...bd, clients: bd.clients.filter((c) => c.id !== id) };
    sauvegarderBD(nouvelleBd);
    setBd(nouvelleBd);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Clients</h1>
      <button onClick={() => naviguer("/clients/nouveau")}>+ Ajouter un client</button>
      <table border="1" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nom</th><th>Email</th><th>Téléphone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bd.clients.map((client) => (
            <tr key={client.id}>
              <td>{client.nom}</td>
              <td>{client.email}</td>
              <td>{client.telephone}</td>
              <td>
                <button onClick={() => naviguer(`/clients/modifier/${client.id}`)}>Modifier</button>
                <button onClick={() => naviguer(`/clients/${client.id}/commandes`)}>Commandes</button>
                <button onClick={() => supprimerClient(client.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}