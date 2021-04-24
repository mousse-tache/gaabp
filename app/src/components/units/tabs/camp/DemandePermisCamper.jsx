import React, { useContext, useEffect, useState } from "react";

import UnitContext from "@aabp/context/unit/unitContext";
import CampContext from "@aabp/context/campContext";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Alert } from "@material-ui/lab";

import r4 from "@aabp/docs/Réglement spécifique 04 - Normes de campement.pdf";

import UserClient from "@aabp/clients/userClient";
import DateStep from "./steps/dateStep";
import ParticipantsSteps from "./steps/ParticipantsSteps";
import LieuStep from "./steps/lieuStep";
import ChefStep from "./steps/chefStep";
import CahierCampStep from "./steps/cahierCampStep";
import Revision from "./steps/revisionStep";

const DefaultCamp = {  
    unit: "",
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
};

const DemandePermisCamper = () => {
    const { unit } = useContext(UnitContext);

    const [camp, setCamp] = useState({...DefaultCamp, unit: unit?._id});
    const [activeStep, setActiveStep] = useState(0);
    const [membres, setMembres] = useState([]);

    const userClient = new UserClient();

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
        setActiveStep(0);
        setCamp({...DefaultCamp, unit: unit?._id});
    }, [unit]);

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
                                <ChefStep />                  
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
                                <CahierCampStep />
                            </StepContent>
                        </Step>
                        <Step key="revision">
                            <StepLabel>Révision</StepLabel>
                            <StepContent>
                                <Revision />
                            </StepContent>
                        </Step>
                    </Stepper>             
                </AccordionDetails>
            </Accordion>
        </CampContext.Provider>   
    );
};

export default DemandePermisCamper;
