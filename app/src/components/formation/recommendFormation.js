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
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';

const RecommendFormation = () => {
    const authedUser = useContext(UserContext).authedUser;
    const { enqueueSnackbar } = useSnackbar();
    const [formation, setFormation] = useState({branche: {couleur: ""}, niveau: {id: ""}, dateRecommende: new Date(), dateConfirme: null, recommendedBy: authedUser._id});
    const [allMembers, setAllMembers] = useState(false);
    const [selectUser, setSelectUser] = useState({_id: 0, prenom: "", nom: "", formations: []});
    const [errorText, setErrorText] = useState(null);

    const userClient = new UserClient();

    const addFormation = async() => { 
        try {            
            await userClient.updateUser({...selectUser, id: selectUser._id, formations: [...selectUser.formations, formation]})
            setSelectUser({_id: 0, prenom: "", nom: "", });
            enqueueSnackbar("Formation recommendée");
            FetchAllUsers();
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    const confirmFormation = async(user) => {
        console.log(user);
        var userFormations = [...user.formations];
        console.log(userFormations)

        try {
            if (userFormations.filter(x => !x.dateConfirme).length > 0)
            {
                userFormations.filter(x => !x.dateConfirme)[0].confirmedBy = authedUser._id;
                userFormations.filter(x => !x.dateConfirme)[0].dateConfirme = new Date();
                console.log(userFormations);
            }
            await userClient.updateUser({...user, id: user._id, formations: userFormations});
            enqueueSnackbar(`La formation de ${user.prenom} a bien été reconnue par toi, ${authedUser.prenom}`);
            FetchAllUsers();
        }
        catch (e) {
            enqueueSnackbar(e);
        }        
    }

    useEffect(() => {
        FetchAllUsers();  
    }, [])

    useEffect(() => {
        if(selectUser.formations.filter(x => x.niveau?.id === formation.niveau.id).length > 0 && selectUser.formations.filter(x => x.branche?.couleur === formation.branche.couleur).length > 0)
        {
            setErrorText("Ce membre a déjà été recommandé pour cette formation");
        }
        else if (errorText !== null) {
            setErrorText(null);
        }
    }, [formation])

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
                autoComplete
                autoSelect                     
                disableClearable
                onChange={(event, newValue) => {
                    setSelectUser(newValue);
                }}
                value={selectUser}
                options={allMembers}
                getOptionLabel={(option) => option.prenom + " " + option.nom}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} required label="Membre" variant="outlined" />}
            />
            <Autocomplete
                fullWidth={true}
                disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation)}
                autoComplete
                autoSelect                    
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
                autoComplete
                autoSelect
                required                      
                disableClearable
                onChange={(event, newValue) => {                    
                    setFormation({...formation, branche: newValue});
                }}
                value={formation.branche}
                options={Branches}
                getOptionLabel={(option) => option.couleur}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} required label="Branche" variant="outlined" 
                error= {selectUser.formations.filter(x => x.niveau?.id === formation.niveau.id).length > 0 && selectUser.formations.filter(x => x.branche?.couleur === formation.branche.couleur).length > 0}
                helperText={errorText} />}
            />     

             <TextField
                fullWidth={true}
                disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation)}
                required
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={(event) => {            
                    setFormation({...formation, dateRecommende: event.target.value});
                }}
                value={formation.dateRecommende}
                style={{ width: 300 }}
                label="Date de la recommendation" 
                variant="outlined"
                type="date"
            />       
            <div>
                <Button 
                    variant={selectUser?._id !== null ? "contained" : "outlined"} 
                    
                    color={selectUser?._id !== null ? "primary" : "secondary"} 
                    hidden={!Permissions(authedUser, PermissionTypes.RecommendFormation)}
                    disabled={!Permissions(authedUser, PermissionTypes.RecommendFormation) || 
                        selectUser._id === 0 || 
                        formation.branche.couleur === "" || 
                        formation.niveau.id === "" ||
                        (selectUser.formations.filter(x => x.niveau?.id === formation.niveau.id).length > 0 &&     
                        selectUser.formations.filter(x => x.branche?.couleur === formation.branche.couleur).length > 0) }  
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
                actions={[
                    {
                      icon: 'check',
                      tooltip: "Approuver la recommandation",
                      onClick: (event, rowData) => confirmFormation(rowData),
                      disabled: !Permissions(authedUser, PermissionTypes.ConfirmFormation)
                    }
                  ]}
                columns={[
                    { title: 'Membre', field: 'prenom', render: (rowData) => `${rowData.prenom} ${rowData.nom}` },
                    { title: 'Formation', field: 'formation', render: (rowData) =>  `${rowData.formations.filter(x => !x.dateConfirme)[0]?.niveau?.id} branche ${rowData.formations.filter(x => !x.dateConfirme)[0]?.branche?.couleur.toLowerCase()}`},
                    { title: 'Recommandé le', field: 'formation.dateRecommended', render: (rowData) =>  `${rowData.formations.filter(x => !x.dateConfirme)[0]?.dateRecommende}`},
                    { title: 'Recommandé par', field: 'formation.recommendedBy', render: (rowData) =>  `${allMembers.filter(member => member._id == rowData.formations.filter(x => !x.dateConfirme)[0]?.recommendedBy)[0]?.prenom} ${allMembers.filter(member => member._id == rowData.formations.filter(x => !x.dateConfirme)[0]?.recommendedBy)[0]?.nom}`},
                  ]}
                // Limitation for now, view only a single formation at a time
                data={allMembers.filter(x => x.formations.filter(y => !y.dateConfirme).length > 0)}     
            />
        </Card>
    </Paper>
    )
}

export default RecommendFormation;
