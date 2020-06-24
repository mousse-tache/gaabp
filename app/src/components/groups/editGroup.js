import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import GroupClient from "../../clients/groupClient"
import UnitClient from "../../clients/unitClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Input, Paper, Button, Card, InputLabel, Breadcrumbs, Typography, CardContent } from '@material-ui/core';

import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';
import UnitTable from "../units/unitTable"

const EditGroup = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [numero, setNumero] = useState(null);
    const [ville, setVille] = useState(null);
    const [nom, setNom] = useState(null);
    const [isFetchingGroup, setIsFetchingGroup] = useState(true);
    const [units, setUnits] = useState([]);
    const [isFetchingUnits, setIsFetchingUnits] = useState(true);
    const [group, setGroup] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();
    const unitClient = new UnitClient();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchGroup();
        FetchUnits()
        userContext.FetchUser();  
    }, [])


    async function FetchUnits() {
        try {               
            var data = await unitClient.getByGroupId(id);
            if(data !== null)
            {
                setUnits(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
        
        setIsFetchingUnits(false);
    }

    async function FetchGroup() {
        try {               
            var data = await groupClient.getById(id);
            if(data !== null)
            {
                setNom(data.nom.toString());
                setNumero(data.numero.toString());
                setVille(data.ville.toString());
                setGroup(data);
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
        <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet> 
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/groupes">
                Groupes
            </Link>
            <Typography color="textPrimary">{`${numero} ${nom}`}</Typography>
        </Breadcrumbs>
        <Card>
            <CardContent>

                <Typography variant="h5">Informations de base</Typography>
                <form className="form">
                
                <InputLabel>Numéro</InputLabel>
                <Input type="text" value={numero} required={true} placeholder="1er" onChange={event => setNumero(event.target.value)} />


                <InputLabel>Nom du groupe</InputLabel>
                <Input type="text" value={nom} placeholder="Group scout de Glasgow" onChange={event => setNom(event.target.value)} />

                <InputLabel>Ville</InputLabel>
                <Input type="text" value={ville} placeholder="Glasgow" onChange={event => setVille(event.target.value)} />
                </form>

            </CardContent>
        
            <CardContent>
                <Typography variant="h5">Unités</Typography>
                {
                    isFetchingUnits && <Loading />
                }
                {
                    !isFetchingUnits && <UnitTable units={units} groups={[group]} />
                }
            </CardContent>
        

        <Typography>
                    <Button variant="contained" color="secondary" hidden={!Permissions(authedUser, PermissionTypes.UpdateGroup)} disabled={!Permissions(authedUser, PermissionTypes.UpdateGroup)} onClick={SaveGroup}>Sauvegarder</Button>
        </Typography>
        </Card>
    </Paper>
    )
}

export default EditGroup;
