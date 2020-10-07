import React, { useContext } from "react";
import NominationContext from "../../../../context/nominationContext";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const VajStep = () => {
    const { nomination, setNomination } = useContext(NominationContext);

    return (
        <div className="step-main-container">
            <h2>
                Vérification des antécédents judiciaires
            </h2>
            <p className="nomination-flex-container">
            Pour tout nouveau chef,  ne pas oublier d'envoyer le formulaire de consentent des vérifications judiciaires accompagné d'une copie de deux pièces d'identité
            </p>
            <div className="nomination-flex-container">
                <FormControl required component="fieldset">
                    <FormLabel component="legend">Je déclare avoir un dossier criminel</FormLabel>
                    <RadioGroup 
                    aria-label="dossier-criminel" 
                    value={nomination.dossierCriminel} 
                    onChange={(event) => setNomination({...nomination, dossierCriminel: event.target.value})}>
                        <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                        <FormControlLabel value="non" control={<Radio />} label="Non" />
                        <FormControlLabel style={{display:"none"}} value="nonselectionner" control={<Radio />} label="Non" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
};

export default VajStep;