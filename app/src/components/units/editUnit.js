import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UnitContext from "../../context/unit/unitContext"
import UnitClient from "../../clients/unitClient"
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import UnitMembersTable from "./unitMembersTable";
import { Paper, Button, Card, Breadcrumbs, Typography, CardContent, TextField } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";

import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';

import UnitDetails from "./unitDetails";
import "./unit.css"

const EditUnit = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const unitContext = useContext(UnitContext);
    const {unit, setUnit} = unitContext;
    const [isFetchingUnit, setIsFetchingUnit] = useState(true);
    const [allMembers, setAllMembers] = useState([]);
    const [selectUser, setSelectUser] = useState({_id: 0, prenom: "", nom: ""});

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
            FetchMembres();
            setSelectUser({_id: 0, prenom: "", nom: ""})
            enqueueSnackbar("Membre ajouté");
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    const RemoveFromUnit = async(user) => { 
        try {            
            user.nominations.filter(x => x.ed === undefined && x.unitId === unit._id)[0].ed = new Date();
            await unitClient.updateUnit({...unit, id: unit._id, membres: unit.membres.filter(x => x != user._id)});
            await userClient.updateUser({...user, id: user._id})
            setMembres(membres?.filter(x => x._id !== user._id))
            enqueueSnackbar("Membre retiré en date d'aujourd'hui");
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    function handleChangeAutoUser(x) {
        setSelectUser(x);
    }

    if(isFetchingUnit || !membres) {
        return (<Loading />)
    }

    return  (
    <Paper className="unit">
        <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet> 
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/unites">
                Unités
            </Link>
            <Typography color="textPrimary">{`${unit.nom}`}</Typography>
        </Breadcrumbs>
        <Card>
            <CardContent>
                <UnitDetails disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit)}/>
                <div className="add-user-search">
                    <div>
                    <Autocomplete
                        fullWidth={true}
                        disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit)}
                        autocomplete
                        autoSelect
                        blurOnSelect                        
                        disableClearable
                        onChange={(event, newValue) => {
                            handleChangeAutoUser(newValue);
                        }}
                        value={selectUser}
                        defaultValue={{prenom: "", nom: ""}}
                        options={allMembers}
                        getOptionLabel={(option) => option.prenom + " " + option.nom}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Cherchez un membre" variant="outlined" />}
                    />
                    </div>
                <div className="add-user-button">
                <Button variant={selectUser?._id !== null ? "contained" : "outlined"} color={selectUser?._id !== null ? "primary" : "secondary"} hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit) || selectUser._id === 0} onClick={addToUnit}>Ajouter à l'unité</Button>
                </div>
            </div>
            </CardContent>
            <CardContent>
                <Typography variant="h5">Membres de l'unité</Typography>
                <UnitMembersTable users={membres.filter(user => user.nominations.filter(x => x.ed === undefined && x.unitId === unit._id).length !== 0)} unitId={unit._id} removeFromUnit={RemoveFromUnit} />
            </CardContent>
        </Card>
    </Paper>
    )
}

export default EditUnit;
