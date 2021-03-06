import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { useSnackbar } from 'notistack';

import { Tabs, Tab } from '@material-ui/core';
import { Paper, Breadcrumbs, Typography } from '@material-ui/core';

import AppContext from "@aabp/context/appContext";
import UnitContext from "@aabp/context/unit/unitContext";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import NominationTypes from "@aabp/utils/nominationTypes";

import UnitDetails from "./unitDetails";
import Loading from "../loading/loading";
import UnitRecensementTab from "./tabs/unitRecensementTab";

import UnitClient from "@aabp/clients/unitClient";
import UserClient from "@aabp/clients/userClient";

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
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState(0);
   
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
        setActiveMembers(membres.filter(user => user.nominations.filter(x => !x.ed && x.unitId === unit?._id).length !== 0))
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
            user.nominations.filter(x => !x.ed && x.unitId === unit._id)[0].ed = new Date();
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
            <Link color="inherit" to="/app/unites">
                Unités
            </Link>
            <Typography color="textPrimary">{`${unit.nom}`}</Typography>
        </Breadcrumbs>

        <div>
            <Tabs 
            value={tab}
            variant="scrollable"
            scrollButtons="auto"
            onChange={(event, newValue) => setTab(newValue)} aria-label="simple tabs for user details">
                <Tab label="Informations" />
                <Tab label="Recensement" />
                <Tab disabled label="Camps" />
            </Tabs>
            {tab === 0 && <UnitDetails disabled={!Permissions(PermissionTypes.UpdateUnit, authedUser)}/>}
            {tab === 1 && <UnitRecensementTab />}  
            {tab === 2 && <div />}
        </div>
    </Paper>
    )
}

export default EditUnit;
