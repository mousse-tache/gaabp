import React, { useState, useContext, useEffect } from "react";
import { Link } from "gatsby";
import Loading from "../loading/loading";
import UserContext from "../../context/userContext";
import GroupClient from "../../clients/groupClient";
import UnitClient from "../../clients/unitClient";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Paper, Button, Card, Breadcrumbs, Typography, CardContent, MenuItem, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Regions from "../../utils/regions";

import { useSnackbar } from 'notistack';
import UnitTable from "../units/unitTable";
import UserClient from "../../clients/userClient";
import GroupMembresTable from "./groupMembersTable";
import { Autocomplete } from "@material-ui/lab";
import NominationTypes from "../../utils/nominationTypes";
import GeoClient from "../../clients/geoClient";

const EditGroup = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [isFetchingGroup, setIsFetchingGroup] = useState(true);
    const [units, setUnits] = useState([]);
    const [isFetchingUnits, setIsFetchingUnits] = useState(true);
    const [group, setGroup] = useState({adresse: "", nom: "", numero: "", region:"", ville:""});
    const [membres, setMembres] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [selectUser, setSelectUser] = useState({prenom: "", nom: "", _id:0});
    const [selectRole, setSelectRole] = useState("");
    const [query, setQuery] = useState("");
    const regions = Regions.map(x => <MenuItem key={x.id} value={x.id}>{`${x.nom}, ${x.province}`}</MenuItem>);
    
    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();
    const unitClient = new UnitClient();
    const userClient = new UserClient();
    const geoClient = new GeoClient();

    var canEdit = Permissions(authedUser, PermissionTypes.UpdateGroup);

    useEffect(() => {
        canEdit = Permissions(authedUser, PermissionTypes.UpdateGroup);
    }, [authedUser])

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchGroup();
        FetchUnits();
        FetchMembres();
    }, [id])

    useEffect(() => {
        FetchAllUsers();
    }, [query])

    async function FetchGeoLocalisation() {
        if(group.adresse !== undefined && group.adresse.length > 5) {
            var data = await geoClient.forward(group.adresse) 
            console.log(data);
        }
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

    async function FetchMembres() {
        try {               
            var data = await userClient.getByGroupId(id);
            if(data !== null)
            {
                setMembres(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    const RemoveFromGroup = async(user) => { 
        try {            
            user.nominations.filter(x => x.ed === undefined && x.groupId === group._id)[0].ed = new Date();
            await unitClient.updateGroup({...group, id: group._id, membres: group.membres.filter(x => x != user._id)});
            await userClient.updateUser({...user, id: user._id})
            setMembres(membres?.filter(x => x._id !== user._id))
            enqueueSnackbar("Membre retiré en date d'aujourd'hui");
        } catch (e) {
            enqueueSnackbar(e);
        }        
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

    const addToGroup = async() => { 
        try {            
            await userClient.updateUser({...selectUser, id: selectUser._id, nominations: [...selectUser.nominations, {groupId: group._id, type:selectRole}]})
            FetchMembres();
            setSelectUser({_id: 0, prenom: "", nom: ""})
            enqueueSnackbar("Membre ajouté");
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    if(isFetchingGroup) {
        return (<Loading />)
    }

    return  (
    <Paper className="profile">
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" to="/app/groupes">
                Groupes
            </Link>
            <Typography color="textPrimary">{`${group.numero} ${group.nom}`}</Typography>
        </Breadcrumbs>
        <Card>
            <CardContent>

                <Typography variant="h5">Informations de base</Typography>
                <form className="form">
                
                <TextField label="Numéro" fullWidth type="text" value={group.numero} disabled={!canEdit} required={true} placeholder="1er" onChange={event => setGroup({...group, numero: event.target.value})} />

                <TextField label="Nom du groupe" fullWidth type="text" value={group.nom} disabled={!canEdit} placeholder="Groupe scout de Glasgow" onChange={event => setGroup({...group, nom: event.target.value})} />

                <TextField label="Ville" fullWidth type="text" value={group.ville} disabled={!canEdit} placeholder="Glasgow" onChange={event => setGroup({...group, ville: event.target.value})} />
                
                <TextField
                    label="Région"
                    select
                    fullWidth
                    value={group.region}
                    disabled={!canEdit}
                    onChange={x => setGroup({...group, region: x.target.value})}
                    >
                    {regions}
                </TextField>
                <TextField
                    label="Adresse"
                    fullWidth
                    value={group.adresse}
                    disabled={!canEdit}
                    onChange={x => setGroup({...group, adresse: x.target.value})}
                    on
                    >
                </TextField>
                <FormControlLabel 
                value={group.public}
                disabled={!group.region || !group.adresse || !group.ville}
                
                control={<Checkbox onClick={() => setGroup({...group, public: !group.public})} />}
                label={(!group.region || !group.adresse || !group.ville) ? "Afficher sur le site public (Requiert ville, région et adresse)" : "Afficher sur le site public"}
                />
                
                <Typography>
                    <Button variant="contained" color="secondary" disabled={!canEdit} hidden={!canEdit} onClick={SaveGroup}>Sauvegarder</Button>
                </Typography>
                </form>

            </CardContent>

            <CardContent>
                <div className="add-user-search">
                    
                        <Autocomplete
                            disabled={!Permissions(authedUser, PermissionTypes.UpdateGroup)}
                            autoSelect
                            blurOnSelect                        
                            disableClearable
                            onChange={(event, newValue) => {
                                setSelectUser(newValue);
                            }}
                            value={selectUser}
                            defaultValue={{prenom: "", nom: ""}}
                            options={[...allMembers, {prenom: "", nom: "", _id:0}]}
                            getOptionLabel={(option) => option.prenom + " " + option.nom}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField fullWidth onChange={(event) => setQuery(event.target.value)} {...params} label="Cherchez un membre" variant="outlined" />}
                        />
                    
                        <TextField
                            label="Rôle"
                            select
                            fullWidth
                            value={selectRole}
                            disabled={!canEdit}
                            variant="outlined"
                            onChange={x => setSelectRole(x.target.value)}
                            >
                            {Object.keys(NominationTypes).map(x => <MenuItem key={x} value={x}>{NominationTypes[x]}</MenuItem>)}
                        </TextField>
                    
                    <div className="add-user-button">
                        <Button variant={selectUser?._id !== null ? "contained" : "outlined"} color={selectUser?._id !== null ? "primary" : "secondary"} hidden={!Permissions(authedUser, PermissionTypes.UpdateGroup)} disabled={!Permissions(authedUser, PermissionTypes.UpdateGroup) || selectUser._id === 0 || !selectRole} onClick={addToGroup}>Ajouter au groupe</Button>
                    </div>
                </div>
            </CardContent>


            <CardContent>
                <Typography variant="h5">Maîtrise de groupe</Typography>
                <GroupMembresTable users={membres.filter(user => user.nominations.filter(x => !x.ed && x.groupId === group._id).length !== 0)} groupId={group._id} removeFromGroup={RemoveFromGroup} />
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
        
        </Card>
    </Paper>
    )
}

export default EditGroup;
