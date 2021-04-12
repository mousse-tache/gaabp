import { Button } from "@material-ui/core";
import React from "react";

import "./camp-summary.scss";

const CampSummary = ({camp}) => {
    const { adresse, codePostal, proprio, telephone } = camp.lieuDuCamp;

    const { chefCamp, chefUnite } = camp;

    return (
        <div className="camp-summary">
            <div className="camp-item">
                <h3>Lieu</h3>
                <div>{`${adresse}, ${codePostal}`}</div>
                <div>{`${proprio}, ${telephone}`}</div>
            </div>
            {
                chefCamp._id !== chefUnite._id &&
                <div className="camp-item">
                    <h3>Chef de camp</h3>
                    <div>{`${chefCamp.prenom} ${chefCamp.nom}`}</div>
                </div>
            }
            <div className="camp-item">
                <h3>Chef d'unité</h3>
                <div>{`${chefUnite.prenom} ${chefUnite.nom}`}</div>
            </div>
            
            <div className="camp-item">
                <h3>Cahier de camp</h3>
                <Button>
                    <a target="_blank" rel="noreferer" href={camp.cahierCamp}>cliquer ici</a>
                </Button>
            </div>
        </div>
    )
};

export default CampSummary;