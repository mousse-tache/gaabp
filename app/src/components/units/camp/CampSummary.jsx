import React from "react";
import { Button } from "@material-ui/core";
import moment from "moment";

import AddToCalendarButton from "../../add-to-calendar/AddToCalendarButton";

import "./camp-summary.scss";

const CampSummary = ({camp}) => {
    const { adresse, codePostal, proprio, telephone } = camp.lieuDuCamp;

    const { chefCamp, chefUnite, debutDuCamp, finDuCamp } = camp;

    const duration = moment.duration(moment(finDuCamp).diff(moment(debutDuCamp))).asHours();

    const event = {
        description: "",
        duration,
        startDatetime : moment(debutDuCamp).format('YYYYMMDDTHHmmssZ'),
        endDatetime: moment(finDuCamp).format('YYYYMMDDTHHmmssZ'),
        location: `${adresse}, ${codePostal}`,
        title: `Camp ${camp.unitInfo.nom}`
    };

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
                    <a target="_blank" rel="noreferrer" href={camp.cahierCamp}>cliquer ici</a>
                </Button>
            </div>
            <AddToCalendarButton event={event} />
        </div>
    );
};

export default CampSummary;