import React, { useState, useContext } from "react";
import { DialogContent, Stepper, Step, StepLabel, Button } from "@material-ui/core";
import PosteStep from "./steps/posteStep";
import VajStep from "./steps/vajStep";
import EngagementStep from "./steps/engagementStep";
import MotivationStep from "./steps/motivationStep";
import NominationContext from "../../../context/nominationContext";
import { NominationClient } from "../../../clients/nominationClient";
import FinalStep from "./steps/finalStep";
import Help from "../../header/help";

const steps = [
    "Choisir une nomination", "Antécédents judiciaires", "Serment des chefs", "Motivations et recommandations"
]

const NominationStepper = () => {
    const { nomination } = useContext(NominationContext);
    const [activeStep, setActiveStep] = useState(0);
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
        await nominationClient.addDemandeNomination(
            {...nomination, 
            approvers: nomination.approvers.map(x => { return {_id: x._id, nom: `${x.prenom} ${x.nom}`}})
        })

        setActiveStep(activeStep+1);
    };

    return (
        <DialogContent>
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                
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
                        disabled={!canSubmit} 
                        onClick={SubmitNomination}>
                            {canSubmit ? "Soumettre la nomination" : "Certaines étapes n'ont pas été complétées"}
                        </Button>
                    )
                }
            </div>
            <div className="nomination-flex-container" >
            </div>
        </DialogContent>
    )
};

export default NominationStepper;