import React, { useContext, useState } from 'react';
import { useSnackbar } from 'notistack';

import { Dialog, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import UnitClient from '@aabp/clients/unitClient';
import UnitContext from '@aabp/context/unit/unitContext';

const ToggleActivationUnit = () => {
    const [open, setOpen] = useState(false);
    const { unit } = useContext(UnitContext);    
    const [isLoading, setIsLoading] = useState(false);

    const unitClient = new UnitClient();
    const { enqueueSnackbar } = useSnackbar();

    async function ToggleActivity() {
        setIsLoading(true);
        if(!unit) {
            return;
        }

        try {
            var data = await unitClient.toggleIsActive(unit._id, !unit.a);
            if(data) {
                enqueueSnackbar("Opération complétée!", { variant: "success"});
            }
            setOpen(false);
            window.location.reload();          
        } catch (e) {
            console.log(e.message);  
            enqueueSnackbar(e?.error?.response?.data, { variant: "error"});
            setIsLoading(false);          
        }        
    }
    
    if(!open) {
        return ( 
        <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpen(true)}>
            {unit.a ? "Désactiver" : "Activer"}
        </Button>);
    }

    return (
        <Dialog fullScreen open={open} onClose={() => setOpen(false)}>           
            <Grid container alignItems="center" spacing={1}>  
                <Grid container alignItems="center" justify="center" spacing={3}>               
                    <Grid item xs={12}>
                        <h2>{unit.a ? "Désactiver": "Activer"} une unité</h2>                    
                    </Grid> 
                    {
                        unit.a && 
                        <Grid item xs={12}>
                            <Alert severity="warning">Attention, cette opération est partiellement irréversible! Les nominations de tous les membres toujours actifs seront terminés en date d'aujourd'hui</Alert>                            
                        </Grid>
                    }                                     
                    <Grid item alignItems="center" justify="center" xs={1}>
                        <div>
                            <Button disabled={isLoading}
                                variant="contained" 
                                color="primary"
                                onClick={() => ToggleActivity()}>
                                Confirmer
                            </Button>
                        </div>
                    </Grid>    
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default ToggleActivationUnit;