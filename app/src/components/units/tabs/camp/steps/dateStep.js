import React, { useContext } from "react";
import moment from "moment";

import {  Typography, Step, StepLabel, StepContent, TextField } from "@material-ui/core";

import CampContext from "@aabp/context/campContext";
import StepAction from "./stepAction";

const DateStep = () => {
    const { camp, setCamp, activeStep, setActiveStep } = useContext(CampContext);

    return  (     
            <div>
                <div>
                    <TextField 
                    label="Date de début" 
                    type="date" 
                    value={camp.debutDuCamp}
                    onChange={(e) => setCamp({...camp, debutDuCamp: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                    <Typography> au </Typography>
                    <TextField 
                    label="Date de fin" 
                    type="date" 
                    value={camp.finDuCamp}
                    onChange={(e) => setCamp({...camp, finDuCamp: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                </div>
                <div>                        
                    <StepAction disabled={!camp.debutDuCamp || !camp.finDuCamp || camp.finDuCamp < camp.debutDuCamp} activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>
        
    );
};

export default DateStep;
