import React, { useContext, useEffect, useState } from "react";

import {  Typography, TextField } from "@material-ui/core";

import CampContext from "@aabp/context/campContext";
import StepAction from "./stepAction";

const DateStep = () => {
    const { camp, setCamp, activeStep, setActiveStep } = useContext(CampContext);
    const [validation, setValidation] = useState({debut: false, fin: false, finText: "", debutText:""});

    useEffect(() => {
        if(camp.finDuCamp && camp.debutDuCamp && (camp.finDuCamp < camp.debutDuCamp)) {
            setValidation({...validation, fin: true, finText: "La fin du camp doit être après le début"});
        }
        else {
            setValidation({...validation, fin: false, finText: ""});
        }
    }, [camp.debutDuCamp, camp.finDuCamp]);

    return  (     
            <div>
                <div>
                    <TextField 
                    error={validation.debut}
                    helperText={validation.debutText}
                    label="Date de début" 
                    type="date" 
                    value={camp.debutDuCamp}
                    onChange={(e) => setCamp({...camp, debutDuCamp: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                    <Typography> au </Typography>
                    <TextField 
                    error={validation.fin}
                    helperText={validation.finText}
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
