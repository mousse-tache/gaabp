import React from "react";

const UnitContext = React.createContext({
    unit: {
        id: null,
        nom: null,
        branche: null,
        genre: null,
        group: null
    }
});

export default UnitContext;