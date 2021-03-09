import React, { useContext } from "react";

import AppContext from "@aabp/context/appContext";
import UnitContext from "@aabp/context/unit/unitContext";

import { Card, CardContent, Typography } from "@material-ui/core";

import DemandePermisCamper from "./camp/demandePermisCamper";

const CampTab = () => {
    const { authedUser } = useContext(AppContext);
    const { unit } = useContext(UnitContext);

    return  (
        <Card>
            <CardContent>
                <Typography variant="h3">Camps</Typography>                
            </CardContent>
            <DemandePermisCamper />
        </Card>
    );
};

export default CampTab;
