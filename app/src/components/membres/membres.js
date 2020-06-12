import React, { useState, useEffect } from "react"
import Loading from "../loading/loading"
import "./membres.css"
import UserClient from "../../clients/userClient"
import { Input, Paper, Button, Fab, Switch, FormControlLabel, InputLabel, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MembresTable from "./membresTable";
import { Helmet } from "react-helmet";

const Membres = () => {
    const [userList, setUserList] = useState([])
    const [courriel, setCourriel] = useState("");
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [isFetchingUserList, setIsFetchingUserList] = useState(true);
    const [open, setOpen] = React.useState(false);
    
    const userClient = new UserClient();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        FetchUsers();
    }, [])

    async function FetchUsers() {
        try {               
            var data = await userClient.getUsers();
            if(data !== null)
            {
                setUserList(data);
            }            
        } catch (e) {
            console.log(e.message);   
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
        }
        catch(e) {
            console.log(e);
        }
    }

    if(isFetchingUserList) {
        return (<Loading />)
    }


    return  (
    <Paper className="membres-paper">    
        <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet>        
        <div className="membres-title">
            <div className="membres-title-element"><h3>Membres</h3></div>
            <div className="membres-title-element">
                <Fab color="primary" aria-label="add" size="small" color="secondary" disabled={open} onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </div>
        </div>
        <Modal 
            className="membres-modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Paper className="membres">
                <form onSubmit={AddUser}>
                    <div className="close-icon">    
                        <Fab color="primary" aria-label="add" size="small" color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </Fab> 
                    </div>   
                    <h3>Nouveau membre</h3>
                    
                    <InputLabel>Courriel</InputLabel>
                    <Input type="text" value={courriel} placeholder="robert@badenpowell.ca" onChange={event => setCourriel(event.target.value)} />

                    <InputLabel>Prénom</InputLabel>
                    <Input type="text" value={prenom} placeholder="Robert" onChange={event => setPrenom(event.target.value)} />

                    <InputLabel>Nom de famille</InputLabel>
                    <Input type="text" value={nom} placeholder="Baden-Powell" onChange={event => setNom(event.target.value)} />
                    <Button className="submit-button" variant="contained" color="secondary" onClick={AddUser}>Ajouter</Button>
                </form>
            </Paper>
        </Modal>

        <MembresTable users={userList} />
    </Paper>
    )
}

export default Membres
