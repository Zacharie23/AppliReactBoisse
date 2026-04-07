import { createContext, useContext, useState } from "react";

const utilisateursDeDemo = [
  { id: 1, email: "admin@test.com", motDePasse: "admin", role: "admin", nom: "Admin" },
  { id: 2, email: "utilisateur@test.com", motDePasse: "user", role: "utilisateur", nom: "Utilisateur" },
];

const ContexteAuth = createContext(null);

export function FournisseurAuth({ children }) {
  const [utilisateurActuel, setUtilisateurActuel] = useState(
    JSON.parse(localStorage.getItem("utilisateurActuel")) || null
  );

  function seConnecter(email, motDePasse) {
    const utilisateurTrouve = utilisateursDeDemo.find(
      (u) => u.email === email && u.motDePasse === motDePasse
    );
    if (utilisateurTrouve) {
      setUtilisateurActuel(utilisateurTrouve);
      localStorage.setItem("utilisateurActuel", JSON.stringify(utilisateurTrouve));
      return true;
    }
    return false;
  }

  function seDeconnecter() {
    setUtilisateurActuel(null);
    localStorage.removeItem("utilisateurActuel");
  }

  return (
    <ContexteAuth.Provider value={{ utilisateurActuel, seConnecter, seDeconnecter }}>
      {children}
    </ContexteAuth.Provider>
  );
}

export function utiliserAuth() {
  return useContext(ContexteAuth);
}