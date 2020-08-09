import React from 'react'
import Loading from '../loading/loading'
import { AccordionDetails } from '@material-ui/core'

const RecensementDetails = ({recensement}) => {

    if(!recensement) {
        return <Loading />
    }

    return (        
        <AccordionDetails>
            Le coût du dernier recensement était de {recensement.cost}$
        </AccordionDetails>
    )
}

export default RecensementDetails