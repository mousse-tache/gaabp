import React, { useContext, useEffect, useState } from "react";
import {  Link, TextField } from "@material-ui/core";

import CampContext from "@aabp/context/campContext";
import StepAction from "./stepAction";

const CahierCampStep = () => {
    const { camp, setCamp, activeStep, setActiveStep } = useContext(CampContext);
    const [validation, setValidation] = useState({error:false, text:""});

    useEffect(() => {
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
    
        if (camp.cahierCamp && camp.cahierCamp.match(regex)) {
            setValidation({error:false, text:""});
        } 
        else if(camp.cahierCamp) {
            setValidation({error:true, text:"Le lien doit être une URL valide"});
        }
    }, [camp.cahierCamp]);

    return  (     
            <div>
                <div>
                    <p>
                        Partager le cahier de camp. L'URL devrait permettre à quiconque possède ce lien d'aller consulter le cahier de camp. Ce peut être un lien Dropbox, Google Drive, Microsoft OneDrive ou tout autre outil de partage en ligne. 
                    </p>
                    <TextField 
                    error={validation.error}
                    helperText={validation.text}
                    label="Lien vers le cahier de camp" 
                    type="url" 
                    value={camp.cahierCamp}
                    onChange={(e) => setCamp({...camp, cahierCamp: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                    {
                        camp.cahierCamp &&
                        <p>
                            <Link href={camp.cahierCamp} target="_blank" rel="noopener">
                                visualiser
                            </Link>
                        </p>
                    }
                </div>
                <div>                        
                    <StepAction disabled={validation.error || !camp.debutDuCamp || !camp.finDuCamp || camp.finDuCamp < camp.debutDuCamp} activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>
        
    );
};

export default CahierCampStep;
