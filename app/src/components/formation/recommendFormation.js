import React, { useState, useEffect, useContext } from "react"
import Loading from "../loading/loading"
import UserClient from "../../clients/userClient"
import { Paper, TextField, Typography, Card, Button } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";
import Branches from "../../utils/branches";
import Formations from "../../utils/formations";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import UserContext from "../../context/userContext";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Helmet } from "react-helmet";
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';

const RecommendFormation = () => {
    const authedUser = useContext(UserContext).authedUser;
    const { enqueueSnackbar } = useSnackbar();
    const [formation, setFormation] = useState({branche: {couleur: ""}, niveau: {id: ""}, dateRecommende: new Date(), dateConfirme: null, recommendedBy: authedUser._id});
    const [allMembers, setAllMembers] = useState(false);
    const [selectUser, setSelectUser] = useState({_id: 0, prenom: "", nom: ""});

    const userClient = new UserClient();

    const addFormation = async() => { 
        try {            
            await userClient.updateUser({...selectUser, id: selectUser._id, formations: [...selectUser.formations, formation]})
            setSelectUser({_id: 0, prenom: "", nom: ""})
            enqueueSnackbar("Formation recommendée");
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    useEffect(() => {
        FetchAllUsers();  
    }, [])

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
    
    if (!allMembers) {
        return <Loading />
    }

    return  (
    <Paper>
        <Typography component="h4">Recommender des formations</Typography>
        <Card className="formation-recommender-card">
            <Autocomplete
                fullWidth={true}
                disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation)}
                autocomplete
                autoSelect
                blurOnSelect                        
                disableClearable
                onChange={(event, newValue) => {
                    setSelectUser(newValue);
                }}
                value={selectUser}
                defaultValue={{prenom: "", nom: ""}}
                options={allMembers}
                getOptionLabel={(option) => option.prenom + " " + option.nom}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} required label="Membre" variant="outlined" />}
            />
            <Autocomplete
                fullWidth={true}
                disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation)}
                autocomplete
                autoSelect
                blurOnSelect                        
                disableClearable
                onChange={(event, newValue) => {
                    setFormation({...formation, niveau: newValue});
                }}
                value={formation.niveau}
                options={Formations}
                getOptionLabel={(option) => option.id}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} required label="Niveau" variant="outlined" />}
            />
            <Autocomplete
                fullWidth={true}
                disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation)}
                autocomplete
                autoSelect
                required
                blurOnSelect                        
                disableClearable
                onChange={(event, newValue) => {                    
                    setFormation({...formation, branche: newValue});
                }}
                value={formation.branche}
                options={Branches}
                getOptionLabel={(option) => option.couleur}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} required label="Branche" variant="outlined" />}
            />     

             <TextField
                fullWidth={true}
                disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation)}
                required
                autocomplete
                autoSelect
                blurOnSelect    
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={(event, newValue) => {                    
                    setFormation({...formation, dateRecommende: newValue});
                }}
                value={formation.dateRecommende}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                defaultValue={formation.dateRecommende}
                label="Date de la recommendation" 
                variant="outlined"
                type="date"
            />       
            <div>
                <Button 
                    variant={selectUser?._id !== null ? "contained" : "outlined"} 
                    
                    color={selectUser?._id !== null ? "primary" : "secondary"} 
                    hidden={!Permissions(authedUser, PermissionTypes.RecommendFormation)} 
                    disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation) || selectUser._id === 0 || formation.branche.couleur === "" || formation.niveau.id === ""} 
                    onClick={addFormation}
                    >
                        Recommender
                </Button>
            </div>            
        </Card>        
        <Card>
            <MaterialTable
                title="Recommandations en attente d'approbation"
                localization={{
                    toolbar: {
                        searchPlaceholder: "Chercher"
                    },
                    body: {
                        deleteTooltip: "Supprimer",
                        editTooltip: "Modifier",
                        addTooltip: "Nouveau"
                    }
                }}
                options={
                    {
                    pageSize: 10,
                    headerStyle: {
                        zIndex: 8
                    }
                    }
                }
                columns={[
                    { title: 'Membre', field: 'prenom', render: (rowData) => `${rowData.prenom} ${rowData.nom}` },
                    { title: 'Formation', field: 'formation', render: (rowData) =>  `${rowData.formations.filter(x => !x.dateConfirme)[0]?.niveau?.id} ${rowData.formations.filter(x => !x.dateConfirme)[0]?.branche?.couleur}`},
                  ]}
                data={allMembers.filter(x => x.formations.length > 0 && x.formations.filter(y => !y.dateConfirme && y.niveau))}     
            />
        </Card>
    </Paper>
    )
}

export default RecommendFormation;
