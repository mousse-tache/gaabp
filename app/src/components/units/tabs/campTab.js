import React, { useContext } from "react";

import AppContext from "@aabp/context/appContext";
import UnitContext from "@aabp/context/unit/unitContext";

import { Card, CardContent, Typography } from "@material-ui/core";

import DemandePermisCamper from "./camp/demandePermisCamper";
import DernierCamp from "./camp/dernierCamp";

const CampTab = () => {
    return  (
        <Card>
            <CardContent>
                <Typography variant="h3">Camps</Typography>                
            </CardContent>
            <DernierCamp />
            <DemandePermisCamper />
        </Card>
    );
};

export default CampTab;
