const donnéesParDéfaut = {
  clients: [
    { id: 1, nom: "Alice Martin", email: "alice@mail.com", telephone: "0601020304" },
    { id: 2, nom: "Bob Dupont", email: "bob@mail.com", telephone: "0605060708" },
  ],
  produits: [
    { id: 1, nom: "Chaise", prix: 49.99, stock: 20, categorie: "Mobilier" },
    { id: 2, nom: "Table", prix: 129.99, stock: 10, categorie: "Mobilier" },
    { id: 3, nom: "Lampe", prix: 24.99, stock: 50, categorie: "Décoration" },
  ],
  commandes: [
    {
      id: 1,
      idClient: 1,
      produits: [{ idProduit: 1, quantite: 2 }],
      statut: "livrée",
      date: "2024-01-15",
    },
    {
      id: 2,
      idClient: 2,
      produits: [{ idProduit: 3, quantite: 1 }],
      statut: "en cours",
      date: "2024-03-10",
    },
  ],
};

if (!localStorage.getItem("baseDeDonnees")) {
  localStorage.setItem("baseDeDonnees", JSON.stringify(donnéesParDéfaut));
}

export function obtenirBD() {
  return JSON.parse(localStorage.getItem("baseDeDonnees"));
}

export function sauvegarderBD(bd) {
  localStorage.setItem("baseDeDonnees", JSON.stringify(bd));
}