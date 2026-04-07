import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenirBD, sauvegarderBD } from "../../donnees/baseDeDonnees";

export default function FormulaireCommande() {
  const { id } = useParams();
  const naviguer = useNavigate();
  const bd = obtenirBD();

  const commandeExistante = id ? bd.commandes.find((c) => c.id === parseInt(id)) : null;

  const [idClient, setIdClient] = useState(commandeExistante?.idClient || "");
  const [statut, setStatut] = useState(commandeExistante?.statut || "en cours");
  const [date, setDate] = useState(commandeExistante?.date || new Date().toISOString().split("T")[0]);
  const [produitsSelectionnes, setProduitsSelectionnes] = useState(
    commandeExistante?.produits || []
  );

  function ajouterProduit() {
    setProduitsSelectionnes([...produitsSelectionnes, { idProduit: "", quantite: 1 }]);
  }

  function modifierProduit(index, champ, valeur) {
    const copie = [...produitsSelectionnes];
    copie[index][champ] = champ === "quantite" ? parseInt(valeur) : parseInt(valeur);
    setProduitsSelectionnes(copie);
  }

  function supprimerLigneProduit(index) {
    setProduitsSelectionnes(produitsSelectionnes.filter((_, i) => i !== index));
  }

  function gererSoumission(e) {
    e.preventDefault();
    const nouvelleBd = { ...bd };

    if (commandeExistante) {
      nouvelleBd.commandes = bd.commandes.map((c) =>
        c.id === parseInt(id)
          ? { ...c, idClient: parseInt(idClient), statut, date, produits: produitsSelectionnes }
          : c
      );
    } else {
      const nouvelId = bd.commandes.length > 0 ? Math.max(...bd.commandes.map((c) => c.id)) + 1 : 1;
      nouvelleBd.commandes = [
        ...bd.commandes,
        { id: nouvelId, idClient: parseInt(idClient), statut, date, produits: produitsSelectionnes },
      ];
    }

    sauvegarderBD(nouvelleBd);
    naviguer("/commandes");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{commandeExistante ? "Modifier la commande" : "Nouvelle commande"}</h1>
      <form onSubmit={gererSoumission}>
        <div>
          <label>Client</label><br />
          <select value={idClient} onChange={(e) => setIdClient(e.target.value)} required>
            <option value="">-- Choisir un client --</option>
            {bd.clients.map((client) => (
              <option key={client.id} value={client.id}>{client.nom}</option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Date</label><br />
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Statut</label><br />
          <select value={statut} onChange={(e) => setStatut(e.target.value)}>
            <option value="en cours">En cours</option>
            <option value="livrée">Livrée</option>
          </select>
        </div>
        <div style={{ marginTop: "15px" }}>
          <h3>Produits</h3>
          {produitsSelectionnes.map((ligne, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
              <select
                value={ligne.idProduit}
                onChange={(e) => modifierProduit(index, "idProduit", e.target.value)}
                required
              >
                <option value="">-- Produit --</option>
                {bd.produits.map((produit) => (
                  <option key={produit.id} value={produit.id}>{produit.nom}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={ligne.quantite}
                onChange={(e) => modifierProduit(index, "quantite", e.target.value)}
                style={{ width: "60px" }}
              />
              <button type="button" onClick={() => supprimerLigneProduit(index)}>Retirer</button>
            </div>
          ))}
          <button type="button" onClick={ajouterProduit}>+ Ajouter un produit</button>
        </div>
        <div style={{ marginTop: "15px" }}>
          <button type="submit">{commandeExistante ? "Enregistrer" : "Créer"}</button>
          <button type="button" style={{ marginLeft: "10px" }} onClick={() => naviguer("/commandes")}>Annuler</button>
        </div>
      </form>
    </div>
  );
}