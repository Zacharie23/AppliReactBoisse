import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { utiliserAuth } from "../contexte/ContexteAuth";

export default function Connexion() {
  const { seConnecter } = utiliserAuth();
  const naviguer = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");

  function gererSoumission(e) {
    e.preventDefault();
    const succes = seConnecter(email, motDePasse);
    if (succes) {
      naviguer("/");
    } else {
      setErreur("Email ou mot de passe incorrect");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Connexion</h2>
      <p>Admin : admin@test.com / admin</p>
      <p>Utilisateur : utilisateur@test.com / user</p>
      {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      <form onSubmit={gererSoumission}>
        <div>
          <label>Email</label><br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Mot de passe</label><br />
          <input value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} type="password" />
        </div>
        <button style={{ marginTop: "15px" }} type="submit">Se connecter</button>
      </form>
    </div>
  );
}