import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";

import AppContext from "@aabp/context/appContext";
import UnitContext from "@aabp/context/unit/unitContext";
import CampContext from "@aabp/context/campContext";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Stepper, Step, StepLabel, StepContent, TextField, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Alert } from "@material-ui/lab";

import r4 from "@aabp/docs/Réglement spécifique 04 - Normes de campement.pdf";

import UserClient from "@aabp/clients/userClient";
import DateStep from "./steps/dateStep";
import StepAction from "./steps/stepAction";
import ParticipantsSteps from "./steps/participantsSteps";
import LieuStep from "./steps/lieuStep";

const DemandePermisCamper = () => {
    const { authedUser } = useContext(AppContext);
    const { unit } = useContext(UnitContext);

    const [camp, setCamp] = useState({  
        unit: unit._id,
        dateSoumission: "",
        debutDuCamp: "",
        finDuCamp: "",
        lieuDuCamp: {
            adresse: "",
            codePostal: "",
            proprio: "",
            telephone: ""
        },
        comments: "",
        chefUnite: null,
        chefCamp: {}
    });
    const [activeStep, setActiveStep] = useState(0);
    const [membres, setMembres] = useState([]);

    const userClient = new UserClient();

    /*
    On va vouloir ajouter une gestion des aides de camp vu que eux n'auront pas toujours de dossiers
    */

    async function FetchMembres() {
        if(!unit?._id) {
            return;
        }

        try {               
            var data = await userClient.getByUnitId(unit._id);
            if(data !== null)
            {
                setMembres(data);
            }            
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        FetchMembres();
    }, [unit]);

    useEffect(() => {
        const chef = membres.find(x => x.nominations.type === "Chef");
        
        if (chef) {
            setCamp({...camp, chefUnite: chef, chefCamp: chef});
        }

    }, [membres]);

    return  (     
        <CampContext.Provider value={{camp, setCamp, activeStep, setActiveStep, membres, setMembres}}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Soumettre une demande d'autorisation de camper</Typography>    
                </AccordionSummary>
                <AccordionDetails>
                    <Alert severity="warning">
                        N'oubliez pas de vous référer aux 
                        <b>
                            <a href={r4} target="_blank" rel="noopener noreferrer"> normes de campement </a>   
                        </b>                 
                        lors de la conception de vos camps.
                    </Alert>
                </AccordionDetails>            
                <AccordionDetails>
                    <Typography>La demande d'autorisation de camper nécessite les dates du camp, son lieu, le chef de camp s'il diffère du chef d'unité, un recensement à jour et les noms et âges des aides de camp. Veuillez saisir les informations manquantes et réviser celles que nous avons déjà.</Typography>              
                </AccordionDetails>         
                <AccordionDetails>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        
                        <Step key="Dates de camp">                        
                            <StepLabel>
                                Dates de camp
                            </StepLabel>
                            <StepContent>
                                <DateStep />
                            </StepContent>
                        </Step>
                        <Step key="Lieu du camp">
                            <StepLabel>
                                Lieu du camp
                            </StepLabel>
                            <StepContent>
                                <LieuStep />
                            </StepContent>
                        </Step>
                        <Step key="chef du camp">
                            <StepLabel>
                                Chef du camp
                            </StepLabel>
                            <StepContent>
                                <p>
                                    Chef d'unité:
                                    {
                                        camp.chefUnite &&
                                        <span>{camp.chefUnite.prenom} {camp.chefUnite.nom}</span>
                                    }
                                </p>      
                                <p>
                                    Chef de camp: 
                                    {
                                        camp.chefCamp &&
                                        <span>{camp.chefCamp.prenom} {camp.chefCamp.nom}</span>
                                    }                          
                                </p>                   
                            </StepContent>
                            <StepContent>                        
                                <StepAction disabled={!camp.chefUnite} activeStep={activeStep} setActiveStep={setActiveStep} />
                            </StepContent>
                        </Step>
                        <Step key="Participants">
                            <StepLabel>
                                Participants
                            </StepLabel>
                            <StepContent>
                                <ParticipantsSteps />
                            </StepContent>
                        </Step>
                        <Step key="Cahier de camp">
                            <StepLabel>
                                Cahier de camp
                            </StepLabel>
                            <StepContent>
                                Téléverser le cahier de camp
                            </StepContent>
                            <StepContent>                        
                                <StepAction activeStep={activeStep} setActiveStep={setActiveStep} />
                            </StepContent>
                        </Step>
                    </Stepper>             
                </AccordionDetails>
            </Accordion>
        </CampContext.Provider>   
    );
};

export default DemandePermisCamper;
