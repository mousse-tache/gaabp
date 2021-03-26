import React, { useContext, useEffect, useState } from "react";

import UnitContext from "@aabp/context/unit/unitContext";
import CampContext from "@aabp/context/campContext";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CampClient from "@aabp/clients/campClient";

import ParticipantsSteps from "./steps/participantsSteps";
import Revision from "./steps/revisionStep";

const DernierCamp = () => {
    const { unit } = useContext(UnitContext);

    const [camp, setCamp] = useState(null);
    const [init, setInit] = useState(false);

    const campClient = new CampClient();
    
    const GetCamp = async() => {
        var data = await campClient.getLast(unit._id);
        if(data) {
            setCamp(data);
        }

        await setInit(true);
    };

    useEffect(() => {
        GetCamp();
    }, [unit]);

    if(!init) {
        return <Skeleton />
    }

    if(!camp) {
        return null;
    }

    return  (     
        <CampContext.Provider value={{camp, setCamp, membres: camp.membres}}>
            {camp && 
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Dernier camp</Typography>    
                </AccordionSummary>        
                <AccordionDetails>                
                    <Revision />    
                    <ParticipantsSteps />
                </AccordionDetails>
            </Accordion>            
            }
        </CampContext.Provider>   
    );
};

export default DernierCamp;
