import React, { useState, useEffect, useContext } from "react";
import { useSnackbar } from 'notistack';

import AppContext from "@aabp/context/appContext";

import Loading from "../loading/loading";
import { Paper, Typography, Card } from '@material-ui/core';
import MaterialTable from 'material-table';
import NewFormationForm from "./components/newFormationForm";

import UserClient from "@aabp/clients/userClient";
import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

const RecommendFormation = () => {
    const { authedUser } = useContext(AppContext);
    const { enqueueSnackbar } = useSnackbar();
    const [formation, setFormation] = useState({branche: {couleur: ""}, niveau: {id: ""}, dateRecommende: new Date(), dateConfirme: null, recommendedBy: authedUser._id});
    const [allPendingFormationMembers, setAllPendingFormationMembers] = useState(false);
    const [query, setQuery] = useState("");
    const [queriedUsers, setQueriedUsers] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [selectUser, setSelectUser] = useState({_id: 0, prenom: "", nom: "", formations: []});
    const [allFormation, setAllFormation] = useState([]);

    const userClient = new UserClient();

    const addFormation = async() => { 
        try {            
            await userClient.updateUser({...selectUser, id: selectUser._id, formations: [...selectUser.formations, formation]})
            setSelectUser({_id: 0, prenom: "", nom: "", formations:[]});
            enqueueSnackbar("Formation recommandée");
            FetchAllUsers();
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    const confirmFormation = async(user) => {
        console.log(user);
        var userFormations = [...allPendingFormationMembers.filter(x => x._id == user._id)[0].formations];
        console.log(userFormations)

        var formationToUpdate = user.formation;

        try {
            if (userFormations.filter(x => !x.dateConfirme && formationToUpdate.niveau == x.niveau && formationToUpdate.branche == x.branche).length > 0)
            {
                userFormations.filter(x => !x.dateConfirme && formationToUpdate.niveau == x.niveau && formationToUpdate.branche == x.branche)[0].confirmedBy = authedUser._id;
                userFormations.filter(x => !x.dateConfirme && formationToUpdate.niveau == x.niveau && formationToUpdate.branche == x.branche)[0].dateConfirme = new Date();
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
        if(allPendingFormationMembers) {
            var allPendingFormationMembersToConfirm =  allPendingFormationMembers.filter(x => x.formations.filter(y => !y.dateConfirme).length > 0);
            var formations = [];
            allPendingFormationMembersToConfirm.forEach(user => {
                user.formations.filter(y => !y.dateConfirme && y.dateRecommende).forEach(formation => {
                    formations.push({prenom: user.prenom, nom: user.nom, _id: user._id, formation: formation})
                })
            });

            setAllFormation(formations);
        }
    },[allPendingFormationMembers])

    useEffect(() => {
        FetchFormateurs();
    }, [allFormation])

    useEffect(() => {
        FetchQueriedUsers();
    }, [query])

    const FetchFormateurs = async() => {
        try {               
            const formateursIds = allFormation.map(x => x.formation.recommendedBy);
            var data = await userClient.getByIds(formateursIds);
            if(data !== null)
            {
                setFormateurs(data);   
            }            
        } catch (e) {
            console.log(e.message);   
        }
    };

    const FetchQueriedUsers = async() => {
        if(query.length < 3) {
            return;
        }

        try {               
            var data = await userClient.searchUsersWithFormations(query);
            if(data !== null)
            {
                setQueriedUsers(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    };

    async function FetchAllUsers() {
        try {               
            var data = await userClient.searchUsersWithPendingFormations();
            if(data !== null)
            {
                setAllPendingFormationMembers(data);   
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }
    
    if (!allPendingFormationMembers) {
        return <Loading />
    }

    return  (
    <Paper>
        <Typography component="h4">Recommander des formations</Typography>
        <NewFormationForm 
        authedUser={authedUser} 
        setSelectUser={setSelectUser} 
        selectUser={selectUser} 
        queriedUsers={queriedUsers} 
        setQuery={setQuery} 
        formation={formation} 
        addFormation={addFormation}
        setFormation={setFormation} />
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
                      disabled: !Permissions(PermissionTypes.ConfirmFormation)
                    }
                  ]}
                columns={[
                    { title: 'Membre', field: 'prenom', render: (rowData) => `${rowData.prenom} ${rowData.nom}` },
                    { title: 'Formation', field: 'formation', render: (rowData) =>  `${rowData.formation.niveau.name} ${rowData.formation.branche.couleur.toLowerCase()}`},
                    { title: 'Recommandé le', field: 'formation.dateRecommended', render: (rowData) =>  `${rowData.formation.dateRecommende}`},
                    { title: 'Recommandé par', field: 'formation.recommendedBy', render: (rowData) =>  `${formateurs.filter(member => member._id == rowData.formation.recommendedBy)[0]?.prenom} ${formateurs.filter(member => member._id == rowData.formation.recommendedBy)[0]?.nom}`},
                  ]}
                // Limitation for now, view only a single formation at a time
                data={allFormation}     
            />
        </Card>
    </Paper>
    )
}

export default RecommendFormation;
