import React, { useState, useEffect } from "react";
import NominationContext from "../../../context/nominationContext";
import { Tooltip, Button, Dialog } from "@material-ui/core";
import NominationStepper from "./nominationStepper";
import "./nomination.css";

const DefaultNomination = 
{role:"",
unit:"",
group:"", 
groupOnly:false, 
dossierCriminel: "nonselectionner",
approvers: [{prenom:"", nom:""},{prenom:"", nom:""}],
motivation: "",
fidelite: "nonselectionner",
engagementChef: "nonselectionner",
engagementAssistant: "nonselectionner",
deonto: "nonselectionner" 
}

const NouvelleNomination = () => {
    const [open, setOpen] = useState(false);
    const [nomination, setNomination] = useState(DefaultNomination);

    useEffect(() => {
        if(nomination.done) {
            setNomination(DefaultNomination);
            setOpen(false);
        }

    },[nomination.done]);

    return (      
        <NominationContext.Provider value={{nomination, setNomination}}>
            <Tooltip title={"Pour soumettre une demande de nomination"}>
                <Button className="header-nomination-button" 
                variant="contained" 
                color="secondary" 
                rel="noopener noreferrer"
                onClick={() => setOpen(true)}>
                    Demande de nomination
                </Button>
            </Tooltip>
            <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
                <NominationStepper />
            </Dialog>
        </NominationContext.Provider>  
    )
};

export default NouvelleNomination;