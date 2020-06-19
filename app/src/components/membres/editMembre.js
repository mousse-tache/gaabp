import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Input, Paper, Button, Switch, FormControlLabel, InputLabel, Breadcrumbs, Typography } from '@material-ui/core';

const EditMembre = ({email}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [courriel, setCourriel] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [id, setId] = useState(id);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isFecthingUser, setIsFetchingUser] = useState(true);
    
    const userClient = new UserClient();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchUser();
    }, [])

    async function FetchUser() {
        try {               
            var data = await userClient.getByEmail(email);
            if(data !== null)
            {
                setNom(data[0].nom.toString());
                setPrenom(data[0].prenom.toString());
                setId(data[0]._id.toString());
                setCourriel(data[0].courriel.toString())
                setIsAdmin(data[0].isAdmin ? data[0].isAdmin: false);
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
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/membres">
                Membres
            </Link>
            <Typography color="textPrimary">{`${prenom} ${nom}`}</Typography>
        </Breadcrumbs>
        <form onSubmit={saveUser} className="form">        
            <h3>Informations de base</h3>
            
            <InputLabel>Courriel</InputLabel>
            <Input type="email" value={courriel} placeholder="robert@badenpowell.ca" disabled={!authedUser?.isAdmin} onChange={event => setCourriel(event.target.value)} />

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
                
        <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.UpdateUser)} onClick={saveUser}>Sauvegarder</Button>
    </Paper>
    )
}



export default EditMembre
