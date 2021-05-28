import React from "react";
import { TextField } from "@material-ui/core";
import { getDetailedService } from "@aabp/utils/anneeService";

const AnneesService = ({nominations}) => {
    var duration = getDetailedService(nominations);

    return (
        <TextField disabled label="Durée du service" variant="outlined" value={duration} />
    );
};

export default AnneesService;