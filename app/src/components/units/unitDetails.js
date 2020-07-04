import React, { useState, useContext, useEffect } from "react"
import Proptypes from "prop-types"
import Loading from "../loading/loading"
import UnitContext from "../../context/unit/unitContext"
import UnitClient from "../../clients/unitClient"
import GroupClient from "../../clients/groupClient"
import { Input, InputLabel, Typography, CardContent, MenuItem, Select, Button } from '@material-ui/core';
import Branches from "../../utils/branches";
import Genre from "../../utils/genre";
import { useSnackbar } from 'notistack';
import "./unit.css"


const UnitDetails = ({disabled}) => { 
    const unitContext = useContext(UnitContext);
    const {unit, setUnit} = unitContext;

    const [isFetchingGroup, setIsFetchingGroup] = useState(true);
    const [group, setGroup] = useState(null);

    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();
    const unitClient = new UnitClient();

    useEffect(() => {
        FetchGroup(unit?.group);
    }, [unit])

    async function FetchGroup(groupId) {
        try {               
            var data = await groupClient.getById(groupId);
            if(data !== null)
            {
                setGroup(data);
            }            
        } catch (e) {
            enqueueSnackbar(e.message);   
        }

        setIsFetchingGroup(false);
    }

    async function SaveUnit(e) {           
        e.preventDefault();
        e.stopPropagation();    
        try {
            await unitClient.updateUnit({...unit, id: unit._id});
            enqueueSnackbar("L'unité " + unit.nom + " a été sauvegardée");
        }
        catch(e) {
            enqueueSnackbar(e);
        }
    }

    if(isFetchingGroup) {
        return (<Loading />)
    }

    return (
        <CardContent>
        <Typography variant="h5">Informations de base</Typography>
        <form className="form">
        
        <InputLabel>Nom de l'unité</InputLabel>
            <Input type="text" 
            disabled={disabled} 
            value={unit.nom} 
            placeholder="1ère Troupe de Glasgow" 
            onChange={event => setUnit({...unit, nom: event.target.value})} />                    

            <InputLabel>Groupe</InputLabel>
            <Input 
             value={group?.nom} 
             disabled
            />

            <InputLabel>Branche</InputLabel>
            <Select
            value={unit.branche}
            disabled={disabled}
            onChange={x => setUnit({...unit, branche: x.target.value})}
            >
            {Branches.map(x => <MenuItem value={x.id}>{x.couleur}</MenuItem>)}
            </Select>

            <InputLabel id="typelabel">Type</InputLabel>
            <Select
            labelId="typelabel"
            value={unit.genre}
            disabled={disabled}
            onChange={x => setUnit({...unit, genre: x.target.value})}
            >
            {Genre.map(x => <MenuItem value={x.id}>{x.nom}</MenuItem>)}
            </Select>           
            
        </form>
        <div className="save-unit-button">
            <Button  
                    variant="contained" 
                    color="secondary" 
                    hidden={disabled} disabled={disabled} onClick={SaveUnit}>Sauvegarder
            </Button>
        </div>
    </CardContent>

    );
};

UnitDetails.propTypes = {
    disabled: Proptypes.bool
};

export default UnitDetails;