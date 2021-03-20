import React from "react";

import { Button } from "@material-ui/core";

import "./stepAction.css";

const StepAction = ({activeStep, setActiveStep, disabled, submit}) => {
    return (
        <div className="step-action">
            <div>
            <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep-1)}
            >
                Étape précédente
            </Button>
            {
                activeStep !== 5 &&
            <Button
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={() => setActiveStep(activeStep+1)}
            >
                {activeStep === 5 ? 'Soumettre' : 'Prochaine étape'}
            </Button>
            }
            {
                activeStep === 5 &&
            <Button
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={() => submit()}
            >
                Soumettre
            </Button>
            }
            </div>
        </div>
    );
};

export default StepAction;