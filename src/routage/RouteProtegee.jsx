import { Navigate } from "react-router-dom";
import { utiliserAuth } from "../contexte/ContexteAuth";

export default function RouteProtegee({ children, adminSeulement = false }) {
  const { utilisateurActuel } = utiliserAuth();

  if (!utilisateurActuel) {
    return <Navigate to="/connexion" />;
  }

  if (adminSeulement && utilisateurActuel.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}