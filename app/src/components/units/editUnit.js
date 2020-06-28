import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UnitContext from "../../context/unit/unitContext"
import UnitClient from "../../clients/unitClient"
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import MembresTable from "../../components/membres/membresTable"
import { Input, Paper, Button, Card, InputLabel, Breadcrumbs, Typography, CardContent, MenuItem, Select, Autocomplete, TextField } from '@material-ui/core';

import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';

import UnitDetails from "./unitDetails";

const EditUnit = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const unitContext = useContext(UnitContext);
    const {unit, setUnit} = unitContext;
    const [isFetchingUnit, setIsFetchingUnit] = useState(true);
    const [allMembers, setAllMembers] = useState([]);
    const [selectUser, setSelectUser] = useState({_id: 0});

    const [membres, setMembres] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const unitClient = new UnitClient();
    const userClient = new UserClient();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchUnit();
        FetchAllUsers();
        userContext.FetchUser();  
    }, [])

    useEffect(() => {
        FetchMembres();
    }, [unit, selectUser])

    async function FetchUnit() {
        try {               
            var data = await unitClient.getById(id);
            console.log(data);
            if(data !== null && data._id)
            {
                setUnit(data);
            }            
            else {
                navigate("/app/unites");
            }
        } catch (e) {
            console.log(e.message);   
            enqueueSnackbar("L'unité n'a pas été trouvée");
            navigate("/app/unites");
        }
        
        setIsFetchingUnit(false);
    }

    async function FetchAllUsers() {
        try {               
            var data = await userClient.getUsers();
            if(data !== null)
            {
                setAllMembers(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    async function FetchMembres() {
        try {               
            var data = await userClient.getByUnitId(id);
            if(data !== null)
            {
                setMembres(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    const addToUnit = async() => { 
        try {            
            await unitClient.updateUnit({...unit, id: unit._id, membres: [...unit.membres, selectUser._id]});
            await userClient.updateUser({...selectUser, id: selectUser._id, nominations: [...selectUser.nominations, {unitId: unit._id, type:"Membre"}]})
            setMembres(membres.push(selectUser))
            setSelectUser({_id:0})
            enqueueSnackbar("Membre ajouté");
        } catch (e) {
            enqueueSnackbar(e);
        }
        
    }

    const handleChangeSelectUser = (x) => {
        setSelectUser(allMembers.filter(e => e._id === x.target.value)[0]);
    }

    if(isFetchingUnit) {
        return (<Loading />)
    }

    return  (
    <Paper className="unit">
        <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet> 
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/unite">
                Unités
            </Link>
            <Typography color="textPrimary">{`${unit.nom}`}</Typography>
        </Breadcrumbs>
        <Card>
            <CardContent>
                <UnitDetails disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit)}/>
                <form>
                <InputLabel id="adduser">Membre à ajouter</InputLabel>
                <Select labelId="adduser" hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} value={selectUser._id} onChange={x => handleChangeSelectUser(x)}>
                        <MenuItem value="0" disabled>Aucun</MenuItem>
                        {allMembers.filter(x => !unit.membres.includes(x._id)).map(x => <MenuItem value={x._id}>{x.prenom} {x.nom}, {x.courriel}</MenuItem>)}
                </Select>
                <div className="add-user-button">
                <Button hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit) || selectUser._id === 0} onClick={addToUnit}>Ajouter à l'unité</Button>
                </div>
                </form>
            </CardContent>
            <CardContent>
                <MembresTable users={membres} />
            </CardContent>
        </Card>
    </Paper>
    )
}

export default EditUnit;
