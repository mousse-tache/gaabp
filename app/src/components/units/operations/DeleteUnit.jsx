import React, { useContext, useState } from 'react';
import { navigate } from "gatsby";
import { useSnackbar } from 'notistack';

import { Dialog, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import UnitClient from '@aabp/clients/unitClient';
import UnitContext from '@aabp/context/unit/unitContext';

const DeleteUnit = () => {
    const [open, setOpen] = useState(false);
    const { unit } = useContext(UnitContext);    
    const [suppressionEnCours, setSuppressionEnCours] = useState(false);

    const unitClient = new UnitClient();
    const { enqueueSnackbar } = useSnackbar();

    async function DeleteNetwork() {
        setSuppressionEnCours(true);
        if(!unit) {
            return;
        }

        try {
            var data = await unitClient.deleteUnit(unit._id);
            if(data) {
                enqueueSnackbar("Suppression complétée!", { variant: "success"});
            }
            setOpen(false);
            navigate(`/app/unites`);            
        } catch (e) {
            console.log(e.message);  
            enqueueSnackbar(e?.error?.response?.data, { variant: "error"});
            setSuppressionEnCours(false);          
        }        
    }
    
    if(!open) {
        return ( 
        <Button onClick={() => setOpen(true)}>
            Supprimer
        </Button>);
    }

    return (
        <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
            <h2>Suppression d'une unité</h2>
            
            <Grid container alignItems="center" spacing={1}>
                
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Grid container alignItems="center" justify="center" spacing={3}>  
                        <Grid item xs={12}>
                            <Alert severity="warning">Attention, cette opération est irréversible!</Alert>                            
                        </Grid>                            
                        <Grid item xs={3}>
                            <div>
                                <Button disabled={suppressionEnCours}
                                 variant="contained" 
                                 color="primary"
                                 onClick={() => DeleteNetwork()}>
                                    Confirmer la suppression
                                </Button>
                            </div>
                        </Grid>               
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default DeleteUnit;