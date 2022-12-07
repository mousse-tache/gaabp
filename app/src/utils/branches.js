const Branches = [
    {id: null, couleur: "Inconnu"},
    {id: 0, couleur: "Bleue"},
    {id: 1, couleur: "Jaune"},
    {id: 2, couleur: "Verte"},
    {id: 3, couleur: "Rouge"},
    {id: 4, couleur: "Multibranche"}
];

const getBranchFromId = (id) => {
    return Branches.find(x => id == x.id).couleur;
};

export {getBranchFromId};

export default Branches;