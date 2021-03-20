import React, { useContext } from "react";

import {  Link, TextField } from "@material-ui/core";

import CampContext from "@aabp/context/campContext";
import StepAction from "./stepAction";

const CahierCampStep = () => {
    const { camp, setCamp, activeStep, setActiveStep } = useContext(CampContext);

    return  (     
            <div>
                <div>
                    <p>
                        Partager le cahier de camp. L'URL devrait permettre à quiconque possède ce lien d'aller consulter le cahier de camp. Ce peut être un lien Dropbox, Google Drive, Microsoft OneDrive ou tout autre outil de partage en ligne. 
                    </p>
                    <TextField 
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
                    <StepAction disabled={!camp.debutDuCamp || !camp.finDuCamp || camp.finDuCamp < camp.debutDuCamp} activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>
        
    );
};

export default CahierCampStep;
