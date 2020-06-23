import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import GroupClient from "../../clients/groupClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Input, Paper, Button, Switch, FormControlLabel, InputLabel, Breadcrumbs, Typography } from '@material-ui/core';

import { useSnackbar } from 'notistack';

const EditGroup = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [numero, setNumero] = useState(null);
    const [ville, setVille] = useState(null);
    const [nom, setNom] = useState(null);
    const [isFetchingGroup, setIsFetchingGroup] = useState(true);
    
    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchGroup();
        userContext.FetchUser();  
    }, [])

    async function FetchGroup() {
        try {               
            var data = await groupClient.getById(id);
            if(data !== null)
            {
                setNom(data.nom.toString());
                setNumero(data.numero.toString());
                setVille(data.ville.toString())
            }            
        } catch (e) {
            console.log(e.message);   
        }

        setIsFetchingGroup(false);
    }

    async function SaveGroup(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await groupClient.updateGroup({id: id, nom: nom, numero: numero, ville: ville});
            enqueueSnackbar('Le groupe ' + nom + " a été sauvegardé");
            FetchGroup();
        }
        catch(e) {
            enqueueSnackbar(e);
        }
    }

    if(isFetchingGroup) {
        return (<Loading />)
    }

    return  (
    <Paper className="profile">
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/groupes">
                Groupes
            </Link>
            <Typography color="textPrimary">{`${numero} ${nom}`}</Typography>
        </Breadcrumbs>
        <form className="form">
            <h3>Informations de base</h3>
            
            <InputLabel>Numéro</InputLabel>
            <Input type="text" value={numero} required={true} placeholder="1er" onChange={event => setNumero(event.target.value)} />


            <InputLabel>Nom du groupe</InputLabel>
            <Input type="text" value={nom} placeholder="Group scout de Glasgow" onChange={event => setNom(event.target.value)} />

            <InputLabel>Ville</InputLabel>
            <Input type="text" value={ville} placeholder="Glasgow" onChange={event => setVille(event.target.value)} />

            <Button className="submit-button" variant="contained" color="secondary" hidden={!Permissions(authedUser, PermissionTypes.UpdateGroup)} disabled={!Permissions(authedUser, PermissionTypes.UpdateGroup)} onClick={SaveGroup}>Sauvegarder</Button>
        </form>
    </Paper>
    )
}

export default EditGroup;
