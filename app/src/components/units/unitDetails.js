import React, { useState, useContext, useEffect } from "react"
import Proptypes from "prop-types"
import Loading from "../loading/loading"
import UnitContext from "../../context/unit/unitContext"
import UnitClient from "../../clients/unitClient"
import GroupClient from "../../clients/groupClient"
import { Input, InputLabel, TextField, Typography, MenuItem, Select, Button, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import Branches from "../../utils/branches";
import Genre from "../../utils/genre";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSnackbar } from 'notistack';


const UnitDetails = ({disabled}) => { 
    const unitContext = useContext(UnitContext);
    const {unit, setUnit} = unitContext;

    const [isFetchingGroup, setIsFetchingGroup] = useState(true);
    const [group, setGroup] = useState(null);
    const [expanded, setExpanded] = useState(true);

    const [groupList, setGroupList] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const groupClient = new GroupClient();
    const unitClient = new UnitClient();

    useEffect(() => {
        async function FetchGroup(groupId) {
            if(!groupId) {
                await FetchGroups();
            }
            else {
                try {               
                    var data = await groupClient.getById(groupId);
                    if(data !== null)
                    {
                        setGroup(data);
                    }            
                } catch (e) {
                    enqueueSnackbar(e.message);   
                }
            }
    
            setIsFetchingGroup(false);
        }
    
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
        }

        FetchGroup(unit?.group);
    }, [unit])

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
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}> 
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">Informations de base</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <form className="form">
                    <InputLabel>Nom de l'unité</InputLabel>
                    <TextField type="text" 
                    fullWidth
                    disabled={disabled} 
                    value={unit.nom} 
                    placeholder="1ère Troupe de Glasgow" 
                    onChange={event => setUnit({...unit, nom: event.target.value})} />                    

                    <InputLabel>Groupe</InputLabel>
                    {unit.group && <Input 
                    fullWidth
                    value={group?.nom} 
                    disabled
                    />}

                    {!unit.group && <TextField
                    select
                    fullWidth
                    value={unit.group} 
                    onChange={event => setUnit({...unit, group: event.target.value})}
                     >
                    <MenuItem value="0" disabled>
                        Glasgow
                    </MenuItem>
                    {groupList.map(x => <MenuItem key={x._id} value={x._id}>{x.numero} {x.nom}</MenuItem>)}
                    </TextField> }

                    <InputLabel>Branche</InputLabel>
                    <Select
                    fullWidth
                    value={unit.branche}
                    disabled={disabled}
                    onChange={x => setUnit({...unit, branche: x.target.value})}
                    >
                    {Branches.map(x => <MenuItem key={x.id} value={x.id}>{x.couleur}</MenuItem>)}
                    </Select>

                    <InputLabel id="typelabel">Type</InputLabel>
                    <Select
                    fullWidth
                    labelId="typelabel"
                    value={unit.genre}
                    disabled={disabled}
                    onChange={x => setUnit({...unit, genre: x.target.value})}
                    >
                    {Genre.map(x => <MenuItem key={x.id} value={x.id}>{x.nom}</MenuItem>)}
                    </Select>    
                    
                    <div className="save-unit-button">
                        <Button  
                                variant="contained" 
                                color="secondary" 
                                hidden={disabled} disabled={disabled} onClick={SaveUnit}>Sauvegarder
                        </Button>
                    </div>       
                    
                </form>
            </AccordionDetails>            
        </Accordion>

    );
};

UnitDetails.propTypes = {
    disabled: Proptypes.bool
};

export default UnitDetails;