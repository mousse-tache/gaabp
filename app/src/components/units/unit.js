import React, { useState, useEffect, useContext } from "react"
import { useSnackbar } from 'notistack';

import { Paper, Button, Fab, Modal, MenuItem, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import AppContext from "@aabp/context/appContext";

import Loading from "../loading/loading"
import UnitTable from "./unitTable";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import Branches from "@aabp/utils/branches";
import Genre from "@aabp/utils/genre";
import UnitClient from "@aabp/clients/unitClient"
import GroupClient from "@aabp/clients/groupClient"

import "./unit.css";

const Unit = () => {
    const { authedUser } = useContext(AppContext);
    const [unitList, setUnitList] = useState([]);
    const [isFetchingUnitList, setIsFetchingUnitList] = useState(true);
    const [isFetchingGroupList, setIsFetchingGroupList] = useState(true);
    const [unit, setUnit] = useState({
        group: "0",
        nom: null,
        branche: null,
        genre: null
    });
    const [open, setOpen] = React.useState(false);  


    const [groupList, setGroupList] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    
    const unitClient = new UnitClient();
    const groupClient = new GroupClient();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function FetchGroups() {
            try {               
                var data = await groupClient.getGroups();
                if(data !== null)
                {
                    setGroupList(data);
                    setIsFetchingGroupList(false);
                }            
            } catch (e) {
                console.log(e.message);   
            }
        }
    
        async function FetchUnits() {
            try {               
                var data = await unitClient.getUnits();
                if(data !== null)
                {
                    setUnitList(data);
                }            
            } catch (e) {
                console.log(e.message);   
            }
            
            setIsFetchingUnitList(false);
        } 
        FetchUnits();
        FetchGroups();
    }, [])

    async function AddUnit(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {

            setUnitList([...unitList, unit])
            await unitClient.addUnit(unit);
            setOpen(false);
            enqueueSnackbar("L'unité " + unit.nom + " a été créée");
            
        }
        catch(e) {
            console.log(e);
        }
    }

    if(isFetchingUnitList || isFetchingGroupList) {
        return (<Loading />);
    }

    return  (
    <Paper className="membres-paper">      
        <div className="membres-title">
            <div className="membres-title-element"><h3>Liste des unités</h3></div>
            <div className="membres-title-element">
                <Fab aria-label="add" size="small" color="secondary" 
                disabled={!Permissions(PermissionTypes.CreateUnit, authedUser)} 
                onClick={handleOpen}>
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
                        <Fab aria-label="close" size="small" color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </Fab> 
                </div>   
                <form className="unit-modal-content">
                    
                    <h3>Nouvelle unité</h3>
                    
                    <TextField 
                    label="Nom de l'unité" 
                    fullWidth type="text" 
                    value={unit.nom} 
                    placeholder="1ère Troupe de Glasgow" 
                    onChange={event => setUnit({...unit, nom: event.target.value})} />                    

                    <TextField
                    select
                    label="Group" 
                    fullWidth
                     value={unit.group} 
                     onChange={event => setUnit({...unit, group: event.target.value})}
                     displayEmpty
                     >
                    <MenuItem value="0" disabled>
                        Glasgow
                    </MenuItem>
                    {groupList.map(x => <MenuItem key={x._id} value={x._id}>{x.numero} {x.nom}</MenuItem>)}
                    </TextField>

                    <TextField
                    select
                    label="Branche"
                    fullWidth
                    value={unit.branche}
                    onChange={x => setUnit({...unit, branche: x.target.value})}
                    >
                    {Branches.map(x => <MenuItem key={x.id} value={x.id}>{x.couleur}</MenuItem>)}
                    </TextField>

                    <TextField
                    select
                    label="Type"
                    fullWidth
                    value={unit.genre}
                    onChange={x => setUnit({...unit, genre: x.target.value})}
                    >
                    {Genre.map(x => <MenuItem key={x.id} value={x.id}>{x.nom}</MenuItem>)}
                    </TextField>

                    <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(PermissionTypes.CreateUser, authedUser)} onClick={AddUnit}>Ajouter</Button>
                </form>
            </Paper>
        </Modal>

        <UnitTable units={unitList} groups={groupList} canEdit={Permissions(PermissionTypes.UpdateUnit, authedUser)} />
    </Paper>
    )
}

export default Unit
