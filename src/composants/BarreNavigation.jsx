import { Link, useNavigate } from "react-router-dom";
import { utiliserAuth } from "../contexte/ContexteAuth";

export default function BarreNavigation() {
  const { utilisateurActuel, seDeconnecter } = utiliserAuth();
  const naviguer = useNavigate();

  function gererDeconnexion() {
    seDeconnecter();
    naviguer("/connexion");
  }

  return (
    <nav style={{ background: "#333", padding: "10px 20px", display: "flex", gap: "20px", alignItems: "center" }}>
      <Link to="/" style={{ color: "white" }}>Tableau de bord</Link>
      <Link to="/clients" style={{ color: "white" }}>Clients</Link>
      <Link to="/produits" style={{ color: "white" }}>Produits</Link>
      <Link to="/commandes" style={{ color: "white" }}>Commandes</Link>
      {utilisateurActuel?.role === "admin" && (
        <Link to="/admin/utilisateurs" style={{ color: "orange" }}>Utilisateurs (Admin)</Link>
      )}
      <span style={{ color: "white", marginLeft: "auto" }}>
        {utilisateurActuel?.nom} ({utilisateurActuel?.role})
      </span>
      <button onClick={gererDeconnexion}>Déconnexion</button>
    </nav>
  );
}