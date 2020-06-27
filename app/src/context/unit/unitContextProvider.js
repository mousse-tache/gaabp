import React, { useState } from "react";
import PropTypes from "prop-types";
import UnitContext from "./unitContext";

const UnitContextProvider = ({children}) => {
    const [unit, setUnit] = useState();

    return (
        <UnitContext.Provider value={{unit, setUnit}} >
            {children}
        </UnitContext.Provider>
    )
}

UnitContextProvider.propTypes = {
    children: PropTypes.node
}

export default UnitContextProvider