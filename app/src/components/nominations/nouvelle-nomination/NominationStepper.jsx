import React, { useState, useContext } from "react";
import { DialogContent, Stepper, Step, StepLabel, Button, CircularProgress } from "@material-ui/core";
import PosteStep from "./steps/PosteStep";
import VajStep from "./steps/VajStep";
import EngagementStep from "./steps/EngagementStep";
import MotivationStep from "./steps/MotivationStep";
import NominationContext from "@aabp/context/nominationContext";
import { NominationClient } from "@aabp/clients/nominationClient";
import FinalStep from "./steps/FinalStep";
import AppContext from "@aabp/context/app/appContext";

const steps = [
    "Choisir une nomination", "Antécédents judiciaires", "Serment des chefs", "Motivations et recommandations"
];

const NominationStepper = () => {
    const { nomination } = useContext(NominationContext);
    const { authedUser } = useContext(AppContext);
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nominationClient = new NominationClient();

    const canSubmit = (nomination.group !== "" || nomination.unit !== "") && 
                        nomination.role != "" && 
                        (nomination.dossierCriminel !== "nonselectionner") &&
                        nomination.fidelite !== "nonselectionner" &&
                        nomination.deonto !== "nonselectionner" && 
                        nomination.motivation !== "" &&
                        nomination.approvers[0]._id !== undefined &&
                        nomination.approvers[1]._id !== undefined;

    const SubmitNomination = async() => {
        setIsSubmitting(true);
        await nominationClient.addDemandeNomination(
            {...nomination, user: authedUser._id,
            approvers: nomination.approvers.map(x => { return {_id: x._id, nom: `${x.prenom} ${x.nom}`};})
        });
        setActiveStep(activeStep+1);
        setIsSubmitting(false);
    };

    return (
        <DialogContent>
            <Stepper activeStep={activeStep}>
            {steps.map((label) => {
                
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
            </Stepper>
            {
                activeStep == 0 && <PosteStep />
            }
            {
                activeStep == 1 && <VajStep />
            }
            {
                activeStep == 2 && <EngagementStep />
            }
            {
                activeStep == 3 && <MotivationStep />
            }
            { 
                activeStep == 4 && <FinalStep />
            }

            <div className="nomination-flex-container">
                {
                    (activeStep !== 0 && activeStep !== 4)  && 
                    (
                    <Button variant="outlined" onClick={() => setActiveStep(activeStep-1)} >
                        Précédent
                    </Button>
                    )
                }
                {
                    activeStep < 3 &&
                    (
                        <Button variant="contained" onClick={() => setActiveStep(activeStep+1)}>
                            Continuer
                        </Button>
                    )
                }
                {
                    activeStep === 3 &&
                    (
                        <Button 
                        variant="contained" 
                        loa1
                        disabled={!canSubmit || isSubmitting} 
                        onClick={() => SubmitNomination()}>
                            {isSubmitting && <CircularProgress />}
                            {canSubmit ? "Soumettre la nomination" : "Certaines étapes n'ont pas été complétées"}
                        </Button>
                    )
                }
            </div>
            <div className="nomination-flex-container" >
            </div>
        </DialogContent>
    );
};

export default NominationStepper;