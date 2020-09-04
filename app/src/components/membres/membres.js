import React, { useState, useEffect, useContext } from "react"
import Loading from "../loading/loading"
import "./membres.css"
import UserClient from "../../clients/userClient"
import { TextField, Paper, Button, Fab, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MembresTable from "./membresTable";
import UserContext from "../../context/userContext";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { useSnackbar } from 'notistack';

const Membres = () => {
    const authedUserContext = useContext(UserContext);
    const authedUser = authedUserContext.authedUser;
    const [userList, setUserList] = useState([])
    const [courriel, setCourriel] = useState("");
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [isFetchingUserList, setIsFetchingUserList] = useState(true);
    const [open, setOpen] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();
    
    const userClient = new UserClient();

    if (!authedUser) {
        authedUserContext.FetchUser();  
    }

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(Permissions(authedUser, PermissionTypes.ViewUsers))
        {
            FetchUsers();
        }
    }, [])

    async function FetchUsers() {
        try {               
            var data = await userClient.getBasicUsers();
            if(data !== null)
            {
                setUserList(data);
            }            
        } catch (e) {
            enqueueSnackbar(e.message, {variant: "error"});   
        }

        setIsFetchingUserList(false);
    }

    async function AddUser(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await userClient.addUser({courriel: courriel, nom: nom, prenom: prenom});
            FetchUsers();
            setOpen(false);
            enqueueSnackbar(`${prenom} ${nom} a été ajouté`, { variant: "success" });
        }
        catch(e) {
            enqueueSnackbar(e.message, {variant: "error"});
        }
    }

    if(isFetchingUserList) {
        return (<Loading />)
    }

    return  (
    <Paper className="membres-paper">           
        <div className="membres-title">
            <div className="membres-title-element"><h3>Membres</h3></div>
            <div className="membres-title-element">
                <Fab color="primary" aria-label="add" size="small" color="secondary" disabled={open || !Permissions(authedUser, PermissionTypes.CreateUser)} onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </div>
        </div>
        <Modal 
            className="unit-modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Paper>
                <div className="close-icon">    
                        <Fab color="primary" aria-label="add" size="small" color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </Fab> 
                </div>  
                <form className="unit-modal-content">
                     
                    <h3>Nouveau membre</h3>
                    
                    <TextField fullWidth label="Courriel" type="text" value={courriel} required={true} placeholder="robert@badenpowell.ca" onChange={event => setCourriel(event.target.value)} />

                    <TextField fullWidth label="Prénom" type="text" value={prenom} placeholder="Robert" onChange={event => setPrenom(event.target.value)} />

                    <TextField fullWidth label="Nom de famille" type="text" value={nom} placeholder="Baden-Powell" onChange={event => setNom(event.target.value)} />
                    
                    <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.CreateUser)} onClick={AddUser}>Ajouter</Button>
                </form>
            </Paper>
        </Modal>
        {!Permissions(authedUser, PermissionTypes.ViewUsers) && <div>Vous n'avez pas accès à consulter la liste des membres</div>}
        <MembresTable users={userList} canEdit={Permissions(authedUser, PermissionTypes.UpdateUser)} />
    </Paper>
    )
}

export default Membres
