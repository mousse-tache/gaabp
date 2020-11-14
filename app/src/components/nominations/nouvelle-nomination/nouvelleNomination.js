import React, { useContext, useState, useEffect } from "react";
import NominationContext from "../../../context/nominationContext";
import { Tooltip, Button, Dialog } from "@material-ui/core";
import NominationStepper from "./nominationStepper";
import "./nomination.css";
import UserContext from "../../../context/userContext";

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
    const { authedUser } = useState(UserContext);

    useEffect(() => {
        if(nomination.done) {
            setNomination(DefaultNomination);
            setOpen(false);
        }

    },[nomination.done]);

    return (      
        <NominationContext.Provider value={{nomination, setNomination}}>
            <Tooltip title={authedUser ? "Pour soumettre une demande de nomination" : "Complétez votre profil en premier lieu" }>
                <Button className="header-nomination-button" 
                variant="contained" 
                color="secondary" 
                rel="noopener noreferrer"
                onClick={() => authedUser && setOpen(true)}>
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