import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import GroupClient from "../../clients/groupClient"
import UnitClient from "../../clients/unitClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Input, Paper, Button, Card, InputLabel, Breadcrumbs, Typography, CardContent, Select, MenuItem } from '@material-ui/core';
import Regions from "../../utils/regions";

import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';
import UnitTable from "../units/unitTable"

const EditGroup = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [isFetchingGroup, setIsFetchingGroup] = useState(true);
    const [units, setUnits] = useState([]);
    const [isFetchingUnits, setIsFetchingUnits] = useState(true);
    const [group, setGroup] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();
    const unitClient = new UnitClient();

    var canEdit = Permissions(authedUser, PermissionTypes.UpdateGroup);

    useEffect(() => {
        canEdit = Permissions(authedUser, PermissionTypes.UpdateGroup);
    }, [authedUser])

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
            await groupClient.updateGroup({...group, id: group._id});
            enqueueSnackbar('Le groupe ' + group.nom + " a été sauvegardé");
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
            <Typography color="textPrimary">{`${group.numero} ${group.nom}`}</Typography>
        </Breadcrumbs>
        <Card>
            <CardContent>

                <Typography variant="h5">Informations de base</Typography>
                <form className="form">
                
                <InputLabel>Numéro</InputLabel>
                <Input type="text" value={group.numero} disabled={!canEdit} required={true} placeholder="1er" onChange={event => setGroup({...group, numero: event.target.value})} />


                <InputLabel>Nom du groupe</InputLabel>
                <Input type="text" value={group.nom} disabled={!canEdit} placeholder="Groupe scout de Glasgow" onChange={event => setGroup({...group, nom: event.target.value})} />

                <InputLabel>Ville</InputLabel>
                <Input type="text" value={group.ville} disabled={!canEdit} placeholder="Glasgow" onChange={event => setGroup({...group, ville: event.target.value})} />
                
                
                <InputLabel id="region-label">Région</InputLabel>
                <Select
                    labelId="region-label"
                    value={group.region}
                    disabled={!canEdit}
                    onChange={x => setGroup({...group, region: x.target.value})}
                    >
                    {Regions.map(x => <MenuItem value={x.id}>{`${x.nom}, ${x.province}`}</MenuItem>)}
                </Select>
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
                    <Button variant="contained" color="secondary" disabled={!canEdit} hidden={!canEdit} onClick={SaveGroup}>Sauvegarder</Button>
        </Typography>
        </Card>
    </Paper>
    )
}

export default EditGroup;
