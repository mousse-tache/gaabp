import React from "react";

const UserContext = React.createContext({
    username: null,
    courriel: null,
    prenom: null,
    nom: null,
    nomcomplet: null
});

export default UserContext;