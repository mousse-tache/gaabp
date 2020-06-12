import React, { useState, useContext, useEffect } from "react"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UserClient from "../../clients/userClient"
import { Input, Paper, Button, Switch, FormControlLabel, InputLabel } from '@material-ui/core';

const Profile = () => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const user = userContext.claims;
    const [courriel, setCourriel] = useState(user.email);
    const [prenom, setPrenom] = useState(authedUser?.prenom);
    const [nom, setNom] = useState(authedUser?.nom);
    const [id, setId] = useState(authedUser?._id);
    const [isAdmin, setIsAdmin] = useState(authedUser?.isAdmin);
    const [isFecthingUser, setIsFetchingUser] = useState(true);
    
    const userClient = new UserClient();

    useEffect(() => {
        FetchUser();
    }, [user])

    useEffect(() => {
        FetchUser();
    }, [])

    useEffect(() => {
        userContext.setAuthedUser({...authedUser, id: id})
    }, [id]);

    useEffect(() => {
        userContext.setAuthedUser({...authedUser, isAdmin: isAdmin})
    }, [isAdmin]);

    useEffect(() => {
        userContext.setAuthedUser({...authedUser, prenom: prenom})
    }, [prenom]);

    useEffect(() => {
        userContext.setAuthedUser({...authedUser, nom: nom})
    }, [nom]);

    async function FetchUser() {
        try {               
            var data = await userClient.getByEmail(user.email);
            console.log(data);
            if(data !== null)
            {
                setNom(data[0].nom.toString());
                setPrenom(data[0].prenom.toString());
                setId(data[0]._id.toString());
                setIsAdmin(data[0].isAdmin ? data[0].isAdmin: false);
                userContext.setAuthedUser(data[0]);
                console.log(userContext);
            }            
        } catch (e) {
            console.log(e.message);   
        }

        setIsFetchingUser(false);
    }

    async function saveUser(e) {           
        e.preventDefault();
        e.stopPropagation();    
        if(id) {
            await userClient.updateUser({id:id, courriel: courriel, nom: nom, prenom: prenom, isAdmin: isAdmin});
        }
        else {
            await userClient.addUser({courriel: courriel, nom: nom, prenom: prenom, isAdmin: isAdmin});
        }
        window.location.reload();
    }

    const handleAdminCheck = () => {
        setIsAdmin(!isAdmin);
    };

    if(isFecthingUser) {
        return (<Loading />)
    }


    return  (
    <Paper className="profile">
        <form onSubmit={saveUser} className="form">        
            <h3>Informations de base</h3>
            
            <InputLabel>Courriel</InputLabel>
            <Input type="email" value={courriel} placeholder="robert@badenpowell.ca" disabled={!isAdmin} onChange={event => setCourriel(event.target.value)} />

            <InputLabel>Prénom</InputLabel>
            <Input type="text" value={prenom} placeholder="Robert" onChange={event => setPrenom(event.target.value)} />

            <InputLabel>Nom de famille</InputLabel>
            <Input type="text" value={nom} placeholder="Baden-Powell" onChange={event => setNom(event.target.value)} />

            <h3>Permissions</h3>
            <FormControlLabel
                control={
                <Switch
                    checked={isAdmin}
                    onChange={handleAdminCheck}
                    name="checkedB"
                    className="switch"
                />
                }
                label="Administrateur de la base de donnée"
            />
            
        </form>
                
        <Button className="submit-button" variant="contained" color="secondary" disabled={courriel !== user.email} onClick={saveUser}>Sauvegarder</Button>
    </Paper>
    )
}

export default Profile
