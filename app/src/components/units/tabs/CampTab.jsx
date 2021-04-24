import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

import DemandePermisCamper from "./camp/DemandePermisCamper";
import DernierCamp from "./camp/DernierCamp";

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
