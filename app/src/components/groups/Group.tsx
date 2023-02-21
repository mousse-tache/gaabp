import React, { useState, useEffect, useContext } from "react";
import { useSnackbar } from 'notistack';
import { Input, Paper, InputLabel, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import AppContext from "@aabp/context/app/appContext";

import Loading from "../loading/loading";
import GroupTable from "./groupTable";
import Button from "@aabp/components/design-system/Button/Button";

import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";

import GroupClient from "../../clients/groupClient";

const Group = () => {
    const { authedUser } = useContext(AppContext);
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
    }, []);

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
        return (<Loading />);
    }


    return  (
    <Paper className="membres">          
        <h2 className="membres-title">
            <span className="membres-title-element">Groupes</span>
            <span className="membres-title-element">
                <Button size="small" color="secondary" disabled={!Permissions(PermissionTypes.CreateGroup, authedUser)} onClick={handleOpen}>
                    <AddIcon />
                </Button>
            </span>
        </h2>
        <Modal 
            className="unit-modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Paper>
                <form className="unit-modal-content">
                    <div className="close-icon">    
                        <Button aria-label="add" size="small" color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </Button> 
                    </div>   
                    <h3>Nouveau groupe</h3>
                    
                    <InputLabel>Numéro</InputLabel>
                    <Input fullWidth type="text" value={numero} required={true} placeholder="1er" onChange={event => setNumero(event.target.value)} />


                    <InputLabel>Nom du groupe</InputLabel>
                    <Input fullWidth type="text" value={nom} placeholder="Group de Glasgow" onChange={event => setNom(event.target.value)} />

                    <InputLabel>Ville</InputLabel>
                    <Input fullWidth type="text" value={ville} placeholder="Glasgow" onChange={event => setVille(event.target.value)} />

                    <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(PermissionTypes.CreateUser, authedUser) || (nom === null || numero === null || ville == null)} onClick={AddGroup}>Ajouter</Button>
                </form>
            </Paper>
        </Modal>

        <GroupTable groups={groupList} canSee={true} />
    </Paper>
    );
};

export default Group;
