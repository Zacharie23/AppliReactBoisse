import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenirBD, sauvegarderBD } from "../../donnees/baseDeDonnees";

export default function FormulaireClient() {
  const { id } = useParams();
  const naviguer = useNavigate();
  const bd = obtenirBD();

  const clientExistant = id ? bd.clients.find((c) => c.id === parseInt(id)) : null;

  const [nom, setNom] = useState(clientExistant?.nom || "");
  const [email, setEmail] = useState(clientExistant?.email || "");
  const [telephone, setTelephone] = useState(clientExistant?.telephone || "");

  function gererSoumission(e) {
    e.preventDefault();
    const nouvelleBd = { ...bd };

    if (clientExistant) {
      // Modification
      nouvelleBd.clients = bd.clients.map((c) =>
        c.id === parseInt(id) ? { ...c, nom, email, telephone } : c
      );
    } else {
      // Ajout
      const nouvelId = bd.clients.length > 0 ? Math.max(...bd.clients.map((c) => c.id)) + 1 : 1;
      nouvelleBd.clients = [...bd.clients, { id: nouvelId, nom, email, telephone }];
    }

    sauvegarderBD(nouvelleBd);
    naviguer("/clients");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{clientExistant ? "Modifier le client" : "Ajouter un client"}</h1>
      <form onSubmit={gererSoumission}>
        <div>
          <label>Nom</label><br />
          <input value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Email</label><br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Téléphone</label><br />
          <input value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <button style={{ marginTop: "15px" }} type="submit">
          {clientExistant ? "Enregistrer" : "Ajouter"}
        </button>
        <button style={{ marginTop: "15px", marginLeft: "10px" }} type="button" onClick={() => naviguer("/clients")}>
          Annuler
        </button>
      </form>
    </div>
  );
}