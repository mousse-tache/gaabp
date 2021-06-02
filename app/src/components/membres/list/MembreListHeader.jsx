import React, {useState, useContext} from "react";
import { useSnackbar } from 'notistack';


import { TextField, Paper, Button, Fab, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


import AppContext from "@aabp/context/app/appContext";

import UserClient from "@aabp/clients/userClient";
import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

const MembreListHeader = () => {
    const { authedUser } = useContext(AppContext);
    const [courriel, setCourriel] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [open, setOpen] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();
    
    const userClient = new UserClient();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    async function AddUser(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await userClient.addUser({courriel: courriel, nom: nom, prenom: prenom});
            setOpen(false);
            enqueueSnackbar(`${prenom} ${nom} a été ajouté`, { variant: "success" });
        }
        catch(e) {
            enqueueSnackbar(e.message, {variant: "error"});
        }
    }

    return (
        <div>
            <h2 className="membres-title">
                <span className="membres-title-element">Liste des membres</span>
                <span className="membres-title-element">
                    <Fab 
                    aria-label="add" 
                    size="small" 
                    color="secondary" 
                    disabled={open || !Permissions(PermissionTypes.CreateUser, authedUser)} 
                    onClick={handleOpen}>
                        <AddIcon />
                    </Fab>
                </span>
            </h2>
            <Modal 
                className="unit-modal"
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <Paper>
                    <div className="close-icon">    
                            <Fab aria-label="add" size="small" color="secondary" onClick={handleClose}>
                                <CloseIcon />
                            </Fab> 
                    </div>  
                    <form className="unit-modal-content">
                        
                        <h3>Nouveau membre</h3>
                        
                        <TextField fullWidth label="Courriel" type="text" value={courriel} required={true} placeholder="robert@badenpowell.ca" onChange={event => setCourriel(event.target.value)} />

                        <TextField fullWidth label="Prénom" type="text" value={prenom} placeholder="Robert" onChange={event => setPrenom(event.target.value)} />

                        <TextField fullWidth label="Nom de famille" type="text" value={nom} placeholder="Baden-Powell" onChange={event => setNom(event.target.value)} />
                        
                        <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(PermissionTypes.CreateUser, authedUser)} onClick={AddUser}>Ajouter</Button>
                    </form>
                </Paper>
            </Modal>
        </div>
    );
};

export default MembreListHeader;