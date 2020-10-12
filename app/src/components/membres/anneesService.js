import React from "react";
import { TextField } from "@material-ui/core";
import getAnneeDeService from "../../utils/anneeService";

const AnneesService = ({nominations}) => {
    var flatYears = getAnneeDeService(nominations);

    return (
        <TextField disabled label="Années de service" variant="outlined" value={flatYears} />
    );
};

export default AnneesService;