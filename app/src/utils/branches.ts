const Branches = [
  { id: null, couleur: "Inconnu" },
  { id: 0, couleur: "Bleue" },
  { id: 1, couleur: "Jaune" },
  { id: 2, couleur: "Verte" },
  { id: 3, couleur: "Rouge" },
  { id: 4, couleur: "Multibranche" },
];

const getBranchFromId = (id: number): { id: number; couleur: string } => {
  return Branches.find((x) => id == x.id).couleur;
};

const getBranchColorFromId = (id: number): string => {
  switch (id) {
    case 0:
      return "blue";
    case 1:
      return "#EEC72C";
    case 2:
      return "green";
    case 3:
      return "red";
    default:
      return "#A3233A";
  }
};

export { getBranchFromId, getBranchColorFromId };

export default Branches;
