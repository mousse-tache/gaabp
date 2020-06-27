import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UnitContext from "../../context/unit/unitContext"
import GroupClient from "../../clients/groupClient"
import UnitClient from "../../clients/unitClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Input, Paper, Button, Card, InputLabel, Breadcrumbs, Typography, CardContent, MenuItem,  Select } from '@material-ui/core';
import Branches from "../../utils/branches";
import Genre from "../../utils/genre";
import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';

const EditUnit = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const unitContext = useContext(UnitContext);
    const {unit, setUnit} = unitContext;
    const [isFetchingGroup, setIsFetchingGroup] = useState(true);
    const [isFetchingUnit, setIsFetchingUnit] = useState(true);
    const [group, setGroup] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();
    const unitClient = new UnitClient();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchUnit()
        userContext.FetchUser();  
    }, [])

    async function FetchUnit() {
        try {               
            var data = await unitClient.getById(id);
            if(data !== null)
            {
                setUnit(data);
                await FetchGroup(data.group);
            }            
        } catch (e) {
            console.log(e.message);   
        }
        
        setIsFetchingUnit(false);
    }

    async function FetchGroup(groupId) {
        try {               
            var data = await groupClient.getById(groupId);
            if(data !== null)
            {
                setGroup(data);
            }            
        } catch (e) {
            enqueueSnackbar(e.message);   
        }

        setIsFetchingGroup(false);
    }

    async function SaveUnit(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await unitClient.updateUnit({...unit, id: unit._id});
            enqueueSnackbar("L'unité " + unit.nom + " a été sauvegardée");
            FetchUnit();
        }
        catch(e) {
            enqueueSnackbar(e);
        }
    }

    if(isFetchingUnit || isFetchingGroup) {
        return (<Loading />)
    }

    return  (
    <Paper className="profile">
        <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet> 
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/groupes">
                Groupes
            </Link>
            <Typography color="textPrimary">{`${unit.nom}`}</Typography>
        </Breadcrumbs>
        <Card>
            <CardContent>

                <Typography variant="h5">Informations de base</Typography>
                <form className="form">
                
                <InputLabel>Nom de l'unité</InputLabel>
                    <Input type="text" value={unit.nom} placeholder="1ère Troupe de Glasgow" onChange={event => setUnit({...unit, nom: event.target.value})} />                    

                    <InputLabel>Groupe</InputLabel>
                    <Input 
                     value={group.nom} 
                     disabled
                    />

                    <InputLabel>Branche</InputLabel>
                    <Select
                    value={unit.branche}
                    onChange={x => setUnit({...unit, branche: x.target.value})}
                    >
                    {Branches.map(x => <MenuItem value={x.id}>{x.couleur}</MenuItem>)}
                    </Select>

                    <InputLabel>Type</InputLabel>
                    <Select
                    value={unit.genre}
                    onChange={x => setUnit({...unit, genre: x.target.value})}
                    >
                    {Genre.map(x => <MenuItem value={x.id}>{x.nom}</MenuItem>)}
                    </Select>
                </form>
            </CardContent>
        <Typography>
                    <Button variant="contained" color="secondary" hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} disabled={!Permissions(authedUser, PermissionTypes.UpdateGroup)} onClick={SaveUnit}>Sauvegarder</Button>
        </Typography>
        </Card>
    </Paper>
    )
}

export default EditUnit;
