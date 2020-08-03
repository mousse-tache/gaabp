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
import { Paper, Button, Breadcrumbs, Typography, MenuItem, TextField, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";
import { useSnackbar } from 'notistack';
import NominationTypes from "../../utils/nominationTypes";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import UnitDetails from "./unitDetails";
import Recensement from "../recensement/recensement"
import Branches from "../../utils/branches"

const EditUnit = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
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
   
    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchAllUsers();
    }, [])

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
        setActiveMembers(membres.filter(user => user.nominations.filter(x => !x.ed && x.unitId === unit?._id).length !== 0))
    }, [membres])

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
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/unites">
                Unités
            </Link>
            <Typography color="textPrimary">{`${unit.nom}`}</Typography>
        </Breadcrumbs>
        <UnitDetails disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit)}/>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">Recenser des membres dans l'unité</Typography>                
            </AccordionSummary>
            <AccordionDetails>
                <Recensement unitId={unit._id} unitMembers={activeMembers} uniteCadette={unit.branche?.couleur !== "Rouge" && unit.branche?.couleur !== "Multibranche"} />
            </AccordionDetails>
            <AccordionDetails>
                <div className="add-user-search">
                    
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

                    <TextField
                        label="Rôle"
                        select
                        fullWidth
                        value={selectRole}
                        disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit)}
                        variant="outlined"
                        onChange={x => setSelectRole(x.target.value)}
                        >
                        {Object.keys(NominationTypes).map(x => <MenuItem value={x}>{NominationTypes[x]}</MenuItem>)}
                    </TextField>
                    <div className="add-user-button">
                        <Button variant={selectUser?._id !== null ? "contained" : "outlined"} color={selectUser?._id !== null ? "primary" : "secondary"} hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit) || selectUser._id === 0} onClick={addToUnit}>Ajouter à l'unité</Button>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
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
                        {activeMembers.filter(user => user.nominations.filter(x => !x.ed && x.unitId === unit?._id && x.type === NominationTypes.Membre).length > 0).length} membre(s) régulier(s)
                    </li>                  
                    <li>
                        {activeMembers.filter(user => user.nominations.filter(x => !x.ed && x.unitId === unit?._id && x.type !== NominationTypes.Membre).length > 0).length} membre(s) de maîtrise
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
