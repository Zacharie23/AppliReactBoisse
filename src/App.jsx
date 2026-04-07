import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FournisseurAuth } from "./contexte/ContexteAuth";
import RouteProtegee from "./routage/RouteProtegee";
import BarreNavigation from "./composants/BarreNavigation";
import Connexion from "./pages/Connexion";
import TableauDeBord from "./pages/TableauDeBord";
import ListeClients from "./pages/clients/ListeClients";
import FormulaireClient from "./pages/clients/FormulaireClient";
import CommandesClient from "./pages/clients/CommandesClient";
import ListeProduits from "./pages/produits/ListeProduits";
import FormulaireProduit from "./pages/produits/FormulaireProduit";
import ListeCommandes from "./pages/commandes/ListeCommandes";
import FormulaireCommande from "./pages/commandes/FormulaireCommande";
import ListeUtilisateurs from "./pages/admin/ListeUtilisateurs";

function MiseEnPage({ children }) {
  return (
    <>
      <BarreNavigation />
      <div>{children}</div>
    </>
  );
}

export default function App() {
  return (
    <FournisseurAuth>
      <BrowserRouter>
        <Routes>
          {/* Route publique */}
          <Route path="/connexion" element={<Connexion />} />

          {/* Routes protégées */}
          <Route path="/" element={
            <RouteProtegee>
              <MiseEnPage><TableauDeBord /></MiseEnPage>
            </RouteProtegee>
          } />

          <Route path="/clients" element={
            <RouteProtegee>
              <MiseEnPage><ListeClients /></MiseEnPage>
            </RouteProtegee>
          } />
          <Route path="/clients/nouveau" element={
            <RouteProtegee>
              <MiseEnPage><FormulaireClient /></MiseEnPage>
            </RouteProtegee>
          } />
          <Route path="/clients/modifier/:id" element={
            <RouteProtegee>
              <MiseEnPage><FormulaireClient /></MiseEnPage>
            </RouteProtegee>
          } />
          <Route path="/clients/:id/commandes" element={
            <RouteProtegee>
              <MiseEnPage><CommandesClient /></MiseEnPage>
            </RouteProtegee>
          } />

          <Route path="/produits" element={
            <RouteProtegee>
              <MiseEnPage><ListeProduits /></MiseEnPage>
            </RouteProtegee>
          } />
          <Route path="/produits/nouveau" element={
            <RouteProtegee>
              <MiseEnPage><FormulaireProduit /></MiseEnPage>
            </RouteProtegee>
          } />
          <Route path="/produits/modifier/:id" element={
            <RouteProtegee>
              <MiseEnPage><FormulaireProduit /></MiseEnPage>
            </RouteProtegee>
          } />

          <Route path="/commandes" element={
            <RouteProtegee>
              <MiseEnPage><ListeCommandes /></MiseEnPage>
            </RouteProtegee>
          } />
          <Route path="/commandes/nouvelle" element={
            <RouteProtegee>
              <MiseEnPage><FormulaireCommande /></MiseEnPage>
            </RouteProtegee>
          } />
          <Route path="/commandes/modifier/:id" element={
            <RouteProtegee>
              <MiseEnPage><FormulaireCommande /></MiseEnPage>
            </RouteProtegee>
          } />

          {/* Route admin uniquement */}
          <Route path="/admin/utilisateurs" element={
            <RouteProtegee adminSeulement={true}>
              <MiseEnPage><ListeUtilisateurs /></MiseEnPage>
            </RouteProtegee>
          } />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </FournisseurAuth>
  );
}