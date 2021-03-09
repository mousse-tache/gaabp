import React, { useContext, useEffect } from "react";
import MaterialTable from "material-table";

import CampContext from "@aabp/context/campContext";

import StepAction from "./stepAction";

const ParticipantsSteps = () => {
    const { activeStep, setActiveStep, membres, setMembres } = useContext(CampContext);

    return  (    
        <div>
            <MaterialTable
            title="Participants recensés et aides de camp"

            localization={{
                toolbar: {
                    searchPlaceholder: "Chercher"
                }
            }}
            
            options={
                {
                pageSize: 10
                }
            }

            columns={[
                { title: "Nom", field:'prenom' },
                { title: "", field:'nom'},
                { title: 'Courriel', field: 'courriel' },
                { title: "Début", field:"nominations.sd", type:"date"},
                { title: "Rôle", field: 'nominations.type'}
            ]}
                
            actions={[
                {
                icon: 'add',
                tooltip: 'Ajouter un aide de camp',
                isFreeAction: true,
                onClick: (event) => alert("You want to add a new row")
                }
            ]}

            data={membres}
            
            />
            <StepAction activeStep={activeStep} setActiveStep={setActiveStep} />
        </div>
    );
};

export default ParticipantsSteps;
