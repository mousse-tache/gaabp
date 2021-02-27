import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { useSnackbar } from 'notistack';

import AppContext from "@aabp/context/appContext";
import UnitContext from "@aabp/context/unit/unitContext"
import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import UnitMembersTable from "./unitMembersTable";
import { Paper, Button, Breadcrumbs, Typography, MenuItem, TextField, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";
import NominationTypes from "@aabp/utils/nominationTypes";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UnitDetails from "./unitDetails";
import Recensement from "../recensement/recensement"
import AddNewUsers from "../recensement/addNewUsers"
import Loading from "../loading/loading"


import UnitClient from "@aabp/clients/unitClient"
import UserClient from "@aabp/clients/userClient"

import "./unit.css";

const EditUnit = ({id}) => {
    const { authedUser } = useContext(AppContext);
    const unitContext = useContext(UnitContext);
    const {unit, setUnit} = unitContext;
    const [isFetchingUnit, setIsFetchingUnit] = useState(true);
    const [allMembers, setAllMembers] = useState([]);
    const [selectUser, setSelectUser] = useState({_id: 0, prenom: "", nom: ""});
    const [selectRole, setSelectRole] = useState(NominationTypes.Membre);
    const [membres, setMembres] = useState([]);
    const [activeMembers, setActiveMembers] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const unitClient = new UnitClient();
    const userClient = new UserClient();
    const [query, setQuery] = useState("")
   
    useEffect(() => {
        FetchAllUsers();
    }, [query])

    useEffect(() => {
        FetchUnit();        
        FetchMembres();
    }, [id])

    useEffect(() => {
        FetchMembres();
    }, [unit, selectUser])

    useEffect(() => {
        if(membres.length == 0) {
            return;
        }
        setActiveMembers(membres)
    }, [membres])

    async function FetchUnit() {
        try {               
            var data = await unitClient.getById(id);
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
        if(query.length < 3) {
            return;
        }

        try {               
            var data = await userClient.searchUsers(query);
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
            await userClient.updateUser({...selectUser, id: selectUser._id, nominations: [...selectUser.nominations, {unitId: unit._id, type:selectRole, sd: new Date("")}]})
            FetchMembres();
            setSelectUser({_id: 0, prenom: "", nom: ""})
            enqueueSnackbar("Membre ajouté");
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    const RemoveFromUnit = async(user) => { 
        try {            
            await userClient.removeFromUnit(user._id, unit._id, user.nominations.type);
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
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" to="/app/unites">
                Unités
            </Link>
            <Typography color="textPrimary">{`${unit.nom}`}</Typography>
        </Breadcrumbs>
        <UnitDetails disabled={!Permissions(PermissionTypes.UpdateUnit, authedUser)}/>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">Recensement</Typography>    
            </AccordionSummary>
            <AccordionDetails>
                <Recensement unitId={unit._id} unitMembers={activeMembers} 
                uniteCadette={unit.branche !== 3 && unit.branche !== 4} />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">Ajouter des membres dans l'unité</Typography>                
            </AccordionSummary>
            <AccordionDetails>
                <div className="add-user-search">  
                    <Autocomplete                        
                        fullWidth={true}
                        disabled={!Permissions(PermissionTypes.UpdateUnit, authedUser)}
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
                        renderInput={(params) => <TextField {...params} onChange={(event) => setQuery(event.target.value)} label="Cherchez un membre" variant="outlined" />}
                    />       

                    <TextField
                        label="Rôle"
                        select
                        fullWidth
                        value={selectRole}
                        disabled={!Permissions(PermissionTypes.AddNomination, authedUser)}
                        variant="outlined"
                        onChange={x => setSelectRole(x.target.value)}
                        >
                        {Object.keys(NominationTypes).map(x => <MenuItem key={x} value={x}>{NominationTypes[x]}</MenuItem>)}
                    </TextField>
                    <div className="add-user-button">
                        <Button variant={selectUser?._id !== null ? "contained" : "outlined"} color={selectUser?._id !== null ? "primary" : "secondary"} 
                        hidden={!Permissions(PermissionTypes.UpdateUnit, authedUser)} 
                        disabled={!Permissions(PermissionTypes.UpdateUnit, authedUser) || selectUser._id === 0} 
                        onClick={addToUnit}>Ajouter à l'unité</Button>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
        {
            Permissions(PermissionTypes.CreateUser, authedUser) && Permissions(PermissionTypes.UpdateUnit, authedUser) && 
            <AddNewUsers unitId={id} 
                        uniteCadette={unit.branche?.couleur !== "Rouge" && unit.branche?.couleur !== "Multibranche"}
                        triggerUpdateMembres={FetchMembres}
                        />
        }
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">Membres de l'unité</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>En résumé</Typography>
                <ul>
                    <li>
                        {activeMembers.length} membre(s) actif(s)
                    </li>  
                    <li>
                        {activeMembers.filter(user => user.nominations.type === NominationTypes.Membre).length} membre(s) régulier(s)
                    </li>                  
                    <li>
                        {activeMembers.filter(user => user.nominations.type !== NominationTypes.Membre).length} membre(s) de maîtrise
                    </li>
                </ul>
            </AccordionDetails>
            <AccordionDetails>
                <UnitMembersTable users={activeMembers} unitId={unit._id} removeFromUnit={RemoveFromUnit} />
            </AccordionDetails>            
        </Accordion>
        
    </Paper>
    )
}

export default EditUnit;
