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

            editable={{
                isEditable: rowData => !rowData._id,                
                isEditHidden: rowData => rowData._id,
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                            const index = oldData.tableData.id;
                            let newMembres = [...membres];
                            newMembres[index] = newData;
                            setMembres(newMembres);
                            resolve();
                    }, 1000);
                })
            }}

            columns={[
                { title: "Nom", field:'prenom' },
                { title: "", field:'nom'},
                { title: 'Courriel', field: 'courriel' },
                { title: "Début", field:"nominations.sd", type:"date", editable: false },
                { title: "Rôle", field: 'nominations.type', editable: false }
            ]}
                
            actions={activeStep && [
                {
                icon: 'add',
                tooltip: 'Ajouter un aide de camp',
                isFreeAction: true,
                onClick: (event) => setMembres([{prenom:"", nom:"", courriel:"", nominations: {type: "Aide de camp", sd:new Date()}},...membres])
                }
            ]}

            data={membres}
            
            />
            {activeStep && 
            <StepAction activeStep={activeStep} setActiveStep={setActiveStep} />}
        </div>
    );
};

export default ParticipantsSteps;
