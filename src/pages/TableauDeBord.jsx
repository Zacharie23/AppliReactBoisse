import { useNavigate } from "react-router-dom";
import { obtenirBD } from "../donnees/baseDeDonnees";

export default function TableauDeBord() {
  const bd = obtenirBD();
  const naviguer = useNavigate();

  const statistiques = [
    { libelle: "Clients", total: bd.clients.length, chemin: "/clients" },
    { libelle: "Produits", total: bd.produits.length, chemin: "/produits" },
    { libelle: "Commandes", total: bd.commandes.length, chemin: "/commandes" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tableau de bord</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {statistiques.map((stat) => (
          <div
            key={stat.libelle}
            onClick={() => naviguer(stat.chemin)}
            style={{ padding: "30px", background: "#f0f0f0", borderRadius: "8px", cursor: "pointer", minWidth: "150px", textAlign: "center" }}
          >
            <h2>{stat.total}</h2>
            <p>{stat.libelle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}