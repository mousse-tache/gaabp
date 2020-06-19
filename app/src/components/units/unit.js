import React, { useState, useEffect, useContext } from "react"
import Loading from "../loading/loading"
import UnitClient from "../../clients/unitClient"
import { Input, Select, Paper, Button, Fab, InputLabel, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import UnitTable from "./unitTable";
import UserContext from "../../context/userContext";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';

const Unit = () => {
    const authedUser = useContext(UserContext).authedUser;
    const [unitList, setUnitList] = useState([]);
    const [numero, setNumero] = useState(null);
    const [ville, setVille] = useState(null);
    const [nom, setNom] = useState(null);
    const [isFetchingUnitList, setIsFetchingUnitList] = useState(true);
    const [open, setOpen] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();
    
    const unitClient = new UnitClient();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        FetchUnits();
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

    async function AddUnit(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await unitClient.addUnit({nom: nom, numero: numero, ville: ville});
            FetchUnits();
            setOpen(false);
            setNom("");
            setVille("");
            setNumero(null);
            enqueueSnackbar('Le unite ' + nom + " a été créé");
        }
        catch(e) {
            console.log(e);
        }
    }

    if(isFetchingUnitList) {
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
                    
                    <InputLabel>Numéro</InputLabel>
                    <Input type="text" value={numero} required={true} placeholder="1er" onChange={event => setNumero(event.target.value)} />


                    <InputLabel>Nom du unite</InputLabel>
                    <Input type="text" value={nom} placeholder="Unit scout de Glasgow" onChange={event => setNom(event.target.value)} />                    

                    <InputLabel>Ville</InputLabel>
                    <Input type="text" value={ville} placeholder="Glasgow" onChange={event => setVille(event.target.value)} />

                    <Button className="submit-button" variant="contained" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.CreateUser)} onClick={AddUnit}>Ajouter</Button>
                </form>
            </Paper>
        </Modal>

        <UnitTable units={unitList} canEdit={Permissions(authedUser, PermissionTypes.UpdateUnit)} />
    </Paper>
    )
}

export default Unit
