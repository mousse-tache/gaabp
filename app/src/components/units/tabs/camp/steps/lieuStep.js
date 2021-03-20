import React, { useContext } from "react";

import { TextField } from "@material-ui/core";

import CampContext from "@aabp/context/campContext";
import StepAction from "./stepAction";

const LieuStep = () => {
    const { camp, setCamp, activeStep, setActiveStep } = useContext(CampContext);
    const { lieuDuCamp } = camp;
    const { adresse, codePostal, proprio, telephone } = lieuDuCamp;

    return  (     
            <div>
                <div className="lieu-step-input-form">                                
                    <TextField 
                    type="text"
                    label="Numéro de rue, ville"
                    placeholder='750, 16e avenue, Montréal'
                    value={adresse}
                    onChange={(e) => setCamp({...camp, lieuDuCamp: {...camp.lieuDuCamp, adresse: e.target.value}})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                           
                    <TextField 
                    type="text"
                    label="Code postal"
                    placeholder='H0H 0H0'
                    value={codePostal}
                    onChange={(e) => setCamp({...camp, lieuDuCamp: {...lieuDuCamp, codePostal: e.target.value}})}
                    InputLabelProps={{
                        shrink: true,
                    }} />       

                    <TextField 
                    type="text"   
                    label="Nom du propriétaire"
                    placeholder='Mowgli'
                    value={proprio}
                    onChange={(e) => setCamp({...camp, lieuDuCamp: {...lieuDuCamp, proprio: e.target.value}})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                    
                    <TextField 
                    type="tel"   
                    label="Numéro de téléphone du propriétaire"
                    placeholder='(555) 555-5555'
                    value={telephone}
                    onChange={(e) => setCamp({...camp, lieuDuCamp: {...lieuDuCamp, telephone: e.target.value}})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                </div>
                <div>                        
                    <StepAction disabled={!(adresse && codePostal && proprio && telephone)} activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>
        
    );
};

export default LieuStep;
