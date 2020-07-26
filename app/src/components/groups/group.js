import React, { useState, useEffect, useContext } from "react"
import Loading from "../loading/loading"
import GroupClient from "../../clients/groupClient"
import { Input, Paper, Button, Fab, InputLabel, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import GroupTable from "./groupTable";
import UserContext from "../../context/userContext";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { useSnackbar } from 'notistack';

const Group = () => {
    const authedUser = useContext(UserContext).authedUser;
    const [groupList, setGroupList] = useState([]);
    const [numero, setNumero] = useState(null);
    const [ville, setVille] = useState(null);
    const [nom, setNom] = useState(null);
    const [isFetchingGroupList, setIsFetchingGroupList] = useState(true);
    const [open, setOpen] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();
    
    const groupClient = new GroupClient();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        FetchGroups();
    }, [])

    async function FetchGroups() {
        try {               
            var data = await groupClient.getGroups();
            if(data !== null)
            {
                setGroupList(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
        
        setIsFetchingGroupList(false);
    }

    async function AddGroup(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await groupClient.addGroup({nom: nom, numero: numero, ville: ville});
            FetchGroups();
            setOpen(false);
            setNom(null);
            setVille(null);
            setNumero(null);
            enqueueSnackbar('Le groupe ' + nom + " a été créé");
        }
        catch(e) {
            console.log(e);
        }
    }

    if(isFetchingGroupList) {
        return (<Loading />)
    }


    return  (
    <Paper className="membres-paper">          
        <div className="membres-title">
            <div className="membres-title-element"><h3>Groupes</h3></div>
            <div className="membres-title-element">
                <Fab color="primary" aria-label="add" size="small" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.CreateGroup)} onClick={handleOpen}>
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
            <Paper className="unit-modal-content">
                <form>
                    <div className="close-icon">    
                        <Fab color="primary" aria-label="add" size="small" color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </Fab> 
                    </div>   
                    <h3>Nouveau groupe</h3>
                    
                    <InputLabel>Numéro</InputLabel>
                    <Input fullWidth type="text" value={numero} required={true} placeholder="1er" onChange={event => setNumero(event.target.value)} />


                    <InputLabel>Nom du groupe</InputLabel>
                    <Input fullWidth type="text" value={nom} placeholder="Group scout de Glasgow" onChange={event => setNom(event.target.value)} />

                    <InputLabel>Ville</InputLabel>
                    <Input fullWidth type="text" value={ville} placeholder="Glasgow" onChange={event => setVille(event.target.value)} />

                    <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.CreateUser) || (nom === null || numero === null || ville == null)} onClick={AddGroup}>Ajouter</Button>
                </form>
            </Paper>
        </Modal>

        <GroupTable groups={groupList} canSee={true} />
    </Paper>
    )
}

export default Group
