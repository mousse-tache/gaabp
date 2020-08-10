import React from 'react'
import Loading from '../loading/loading'
import { AccordionDetails, Grid, Typography } from '@material-ui/core'

const RecensementDetails = ({recensement}) => {

    if(!recensement) {
        return <Loading />
    }

    return (        
        <AccordionDetails>
            <Grid container spacing={3}>            
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Dernier recensement
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <b>Année:</b> {new Date(recensement.date).getFullYear()}
                </Grid>
                <Grid item xs={5}>
                    <b>Nombre de membres:</b> {recensement.details.unitMembers.length}
                </Grid>
                <Grid item xs={3}>
                    <b>Coût total:</b> {recensement.cost},00$
                </Grid>


            </Grid>
        </AccordionDetails>
    )
}

export default RecensementDetails