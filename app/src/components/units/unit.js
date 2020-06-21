import React, { useState, useEffect, useContext } from "react"
import Loading from "../loading/loading"
import UnitClient from "../../clients/unitClient"
import GroupClient from "../../clients/groupClient"
import { Input, Select, Paper, Button, Fab, InputLabel, Modal, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import UnitTable from "./unitTable";
import UserContext from "../../context/userContext";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import Branches from "../../utils/branches";
import Genre from "../../utils/genre";
import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';

const Unit = () => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    
    const [unitList, setUnitList] = useState([]);
    const [groupe, setGroup] = useState(null);
    const [nom, setNom] = useState(null);
    const [isFetchingUnitList, setIsFetchingUnitList] = useState(true);
    const [isFetchingGroupList, setIsFetchingGroupList] = useState(true);
    const [branche, setBranche] = useState(null);
    const [genre, setGenre] = useState(null)
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
        FetchUnits();
        FetchGroups();
        userContext.FetchUser();
    }, [])

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

    async function AddUnit(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await unitClient.addUnit({nom: nom, group: groupe, branche: branche, genre: genre});
            setNom("");
            setGroup("");
            setBranche(null);
            setGenre(null);
            setOpen(false);
            enqueueSnackbar("L'unité " + nom + " a été créée");
            FetchUnits();
        }
        catch(e) {
            console.log(e);
        }
    }

    if(isFetchingUnitList || isFetchingGroupList) {
        return (<Loading />)
    }


    /*
    nom: String,
    chef: mongoose.Types.ObjectId,
    group: mongoose.Types.ObjectId,
    assistants: Array,
    cd: Date,
    membres: Array
    */

    return  (
    <Paper className="membres-paper">    
        <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet>        
        <div className="membres-title">
            <div className="membres-title-element"><h3>Liste des unités</h3></div>
            <div className="membres-title-element">
                <Fab color="primary" aria-label="add" size="small" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.CreateUnit)} onClick={handleOpen}>
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
                <form>
                    <div className="close-icon">    
                        <Fab color="primary" aria-label="add" size="small" color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </Fab> 
                    </div>   
                    <h3>Nouvelle unité</h3>
                    
                    <InputLabel>Nom de l'unité</InputLabel>
                    <Input type="text" value={nom} placeholder="1ère Troupe de Glasgow" onChange={event => setNom(event.target.value)} />                    

                    <InputLabel>Groupe</InputLabel>
                    <Select 
                     value={groupe} 
                     onChange={event => setGroup(event.target.value)}
                     displayEmpty
                     >
                    <MenuItem value="" disabled>
                        Glasgow
                    </MenuItem>
                    {groupList.map(x => <MenuItem value={x._id}>{x.numero} {x.nom}</MenuItem>)}
                    </Select>

                    <InputLabel>Branche</InputLabel>
                    <Select
                    value={branche}
                    onChange={x => setBranche(x.target.value)}
                    >
                    {Branches.map(x => <MenuItem value={x.id}>{x.couleur}</MenuItem>)}
                    </Select>

                    <InputLabel>Type</InputLabel>
                    <Select
                    value={genre}
                    onChange={x => setGenre(x.target.value)}
                    >
                    {Genre.map(x => <MenuItem value={x.id}>{x.nom}</MenuItem>)}
                    </Select>

                    <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.CreateUser)} onClick={AddUnit}>Ajouter</Button>
                </form>
            </Paper>
        </Modal>

        <UnitTable units={unitList} groups={groupList} canEdit={Permissions(authedUser, PermissionTypes.UpdateUnit)} />
    </Paper>
    )
}

export default Unit
