import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UnitContext from "../../context/unit/unitContext"
import GroupClient from "../../clients/groupClient"
import UnitClient from "../../clients/unitClient"
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import MembresTable from "../../components/membres/membresTable"
import { Input, Paper, Button, Card, InputLabel, Breadcrumbs, Typography, CardContent, MenuItem, Select, Autocomplete } from '@material-ui/core';
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
    const [allMembers, setAllMembers] = useState([]);
    const [selectUser, setSelectUser] = useState({_id: 0});

    const [membres, setMembres] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();
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
                await FetchGroup(data.group);
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
            setSelectUser(false);
        }
        catch(e) {
            enqueueSnackbar(e);
        }
    }

    const addToUnit = async() => { 
        try {            
            await unitClient.updateUnit({...unit, id: unit._id, membres: [...unit.membres, selectUser._id]});
            await userClient.updateUser({...selectUser, id: selectUser._id, nominations: [...selectUser.nominations, {unitId: unit._id, type:"Membre"}]})
            enqueueSnackbar("Membre ajouté");
        } catch (e) {
            enqueueSnackbar(e);
        }
        
    }

    const handleChangeSelectUser = (x) => {
        setSelectUser(allMembers.filter(e => e._id === x.target.value)[0]);
    }

    if(isFetchingUnit || isFetchingGroup) {
        return (<Loading />)
    }

    return  (
    <Paper className="profile">
        <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet> 
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/unite">
                Unités
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

                    <InputLabel id="typelabel">Type</InputLabel>
                    <Select
                    labelId="typelabel"
                    value={unit.genre}
                    onChange={x => setUnit({...unit, genre: x.target.value})}
                    >
                    {Genre.map(x => <MenuItem value={x.id}>{x.nom}</MenuItem>)}
                    </Select>

                    <InputLabel id="adduser">Membre à ajouter</InputLabel>
                <Select labelId="adduser" hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} value={selectUser._id} onChange={x => handleChangeSelectUser(x)}>
                        <MenuItem value="0" disabled>Aucun</MenuItem>
                        {allMembers.map(x => <MenuItem value={x._id}>{x.prenom} {x.nom}, {x.courriel}</MenuItem>)}
                </Select>
                <Button hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} disabled={!Permissions(authedUser, PermissionTypes.UpdateUnit) || selectUser._id === 0} onClick={addToUnit}>Ajouter à l'unité</Button>
            
                 </form>

            <CardContent className="add-user-to-unit">
            
            </CardContent>
            </CardContent>
            <CardContent>
                <MembresTable users={membres} />
            </CardContent>
        <Typography>
                    <Button variant="contained" color="secondary" hidden={!Permissions(authedUser, PermissionTypes.UpdateUnit)} disabled={!Permissions(authedUser, PermissionTypes.UpdateGroup)} onClick={SaveUnit}>Sauvegarder</Button>
        </Typography>
        </Card>
    </Paper>
    )
}

export default EditUnit;
