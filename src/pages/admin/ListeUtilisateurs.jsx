import { useState, useEffect } from "react";

// Comptes locaux (même liste que dans ContexteAuth)
const utilisateursLocaux = [
  { id: 1, email: "admin@test.com", role: "admin", nom: "Admin" },
  { id: 2, email: "utilisateur@test.com", role: "utilisateur", nom: "Utilisateur" },
];

export default function ListeUtilisateurs() {
  const [utilisateursApi, setUtilisateursApi] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState(utilisateursLocaux);
  const [chargement, setChargement] = useState(true);

  // Appel JSONPlaceholder pour afficher des utilisateurs supplémentaires
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((reponse) => reponse.json())
      .then((donnees) => {
        setUtilisateursApi(donnees);
        setChargement(false);
      });
  }, []);

  function supprimerUtilisateur(id) {
    setUtilisateurs(utilisateurs.filter((u) => u.id !== id));
  }

  function changerRole(id) {
    setUtilisateurs(
      utilisateurs.map((u) =>
        u.id === id
          ? { ...u, role: u.role === "admin" ? "utilisateur" : "admin" }
          : u
      )
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestion des utilisateurs (Admin)</h1>

      <h2>Comptes de l'application</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nom</th><th>Email</th><th>Rôle</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((u) => (
            <tr key={u.id}>
              <td>{u.nom}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => changerRole(u.id)}>Changer rôle</button>
                <button onClick={() => supprimerUtilisateur(u.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "30px" }}>Utilisateurs JSONPlaceholder</h2>
      {chargement ? (
        <p>Chargement...</p>
      ) : (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nom</th><th>Email</th><th>Ville</th>
            </tr>
          </thead>
          <tbody>
            {utilisateursApi.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}