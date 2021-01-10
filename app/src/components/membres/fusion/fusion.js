import React, { useContext, useEffect, useState } from 'react';
import { navigate } from "gatsby";
import { useSnackbar } from 'notistack';

import UserContext from '@aabp/context/userContext';

import { Dialog, Button, Grid, TextField } from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import MemberDetails from "@aabp/components/membres/memberDetails";

import UserClient from '@aabp/clients/userClient';

const Fusion = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { member } = useContext(UserContext);    
    const [query, setQuery] = useState("");
    const [searchedMembers, setSearchedMembers] = useState([]);
    const [fusionEnCours, setFusionEnCours] = useState(false);

    const userClient = new UserClient();
    const { enqueueSnackbar } = useSnackbar();

    async function SearchUsers() {
        if(query.length < 3) {
            return;
        }

        try {               
            var data = await userClient.searchUsers(query);
            if(data !== null)
            {
                setSearchedMembers(data.filter(x => x._id !== member._id));
                
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    async function Fuse() {
        setFusionEnCours(true);
        if(!selectedUser) {
            return;
        }

        try {
            var data = await userClient.fuseUsers(member, selectedUser);
            if(data) {
                enqueueSnackbar("Fusion complétée!", { variant: "success"});
            }
            setOpen(false);
            navigate(`/app/membre/${selectedUser._id}`);            
        } catch (e) {
            console.log(e.message);  
            enqueueSnackbar(e?.error?.response?.data, { variant: "error"});
            setFusionEnCours(false);          
        }
        
    }

    useEffect(() => {
        SearchUsers();
    }, [query]);

    
    if(!open) {
        return ( 
        <Button onClick={() => setOpen(true)}>
            Fusionner
        </Button>);
    }

    return (
        <Dialog fullScreen open={open} onClose={() => setOpen(false)}  >
            <h2>Fusion de dossiers</h2>
            
            <Grid container alignItems="center" spacing={1} >
                
                <Grid item xs={3} />
                <Grid item xs={6}>

                    <Grid container alignItems="center" justify="center" spacing={3}>                    
                        <Grid item xs={12}>
                        <h3>
                            <ul>
                                <li>
                                    Le membre résultant de la fusion conservera le nom et le courriel du membre destinataire.
                                </li>
                                <li>
                                    Les nominations, formations et décorations seront du membre fusionné seront ajouté au membre destinataire.
                                </li>
                            </ul>
                        </h3>
                        <Autocomplete                        
                                    fullWidth={true}
                                    autoSelect
                                    blurOnSelect                        
                                    disableClearable
                                    onChange={(event, newValue) => {
                                        setSelectedUser(newValue);
                                    }}
                                    value={selectedUser}
                                    defaultValue={{prenom: "", nom: ""}}
                                    options={searchedMembers}
                                    getOptionLabel={(option) => option.prenom + " " + option.nom}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} onChange={(event) => setQuery(event.target.value)} label="Cherchez un membre" variant="outlined" />}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <b>Membre fusionné: </b>

                            {`${member.prenom} ${member.nom}`}
                            <MemberDetails />
                        </Grid>
                        <Grid item xs={6}>
                            <b>Membre destinataire: </b>
                            {selectedUser ?`${selectedUser?.prenom} ${selectedUser?.nom}` : "à sélectionner"}
                            <UserContext.Provider value={{member: selectedUser}}>
                                    <MemberDetails />
                            </UserContext.Provider>
                        </Grid>
                        <Grid item xs={12}>
                            <Alert severity="warning">Attention, cette opération est irréversible!</Alert>                            
                        </Grid>                            
                        <Grid item xs={12}>
                            <div>
                                <Button disabled={!selectedUser || fusionEnCours}
                                 variant="contained" 
                                 color="primary"
                                 onClick={() => Fuse()}>
                                    Lancer la fusion
                                </Button>
                            </div>
                        </Grid>               
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default Fusion;