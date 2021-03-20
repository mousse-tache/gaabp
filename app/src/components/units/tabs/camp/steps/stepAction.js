import React from "react";

import { Button } from "@material-ui/core";

import "./stepAction.css";

const StepAction = ({activeStep, setActiveStep, disabled}) => {
    return (
        <div className="step-action">
            <div>
            <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep-1)}
            >
                Étape précédente
            </Button>
            <Button
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={() => setActiveStep(activeStep+1)}
            >
                {activeStep === 4 ? 'Soumettre' : 'Prochaine étape'}
            </Button>
            </div>
        </div>
    );
};

export default StepAction;