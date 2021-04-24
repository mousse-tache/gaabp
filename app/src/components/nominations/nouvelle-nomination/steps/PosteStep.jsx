import React, { useContext, useState, useEffect } from "react";
import { TextField, MenuItem, FormControlLabel, Switch } from "@material-ui/core";
import NominationTypes from "../../../../utils/nominationTypes";
import NominationContext from "../../../../context/nominationContext";
import UnitClient from "../../../../clients/unitClient";
import GroupClient from "../../../../clients/groupClient";

const PosteStep = () => {
    const {nomination, setNomination} = useContext(NominationContext);
    const [unitList, setUnitList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const unitClient = new UnitClient();
    const groupClient = new GroupClient();

    useEffect(() => {
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
        } 
        if(!nomination.groupOnly) {
            FetchUnits();
        }
        else {
            FetchGroups();
        }
    }, [nomination.groupOnly])

    return (
        <div className="step-main-container" >
            <h2>
                Choix de la nomination
            </h2>
            <div className="nomination-flex-container">
                <div>
                    <TextField
                        label="Rôle"
                        select
                        fullWidth
                        value={nomination.role}
                        variant="outlined"
                        onChange={x => setNomination({...nomination, role: x.target.value})}
                        >
                        {Object.keys(NominationTypes).map(x => <MenuItem key={x} value={x}>{NominationTypes[x]}</MenuItem>)}
                    </TextField>
                </div>               
            </div>   
            <div className="nomination-flex-container"> 
                <FormControlLabel
                    control={
                    <Switch
                        checked={nomination.groupOnly}
                        onChange={() => setNomination({...nomination, groupOnly: !nomination.groupOnly})}
                        color="primary"
                    />
                    }
                    label={nomination.groupOnly ? "de groupe" : "d'unité"}
                />                
            </div>
            <div className="nomination-flex-container">                    
                <div>
                    {nomination.groupOnly && <TextField
                        label="Groupe"
                        select
                        fullWidth
                        value={nomination.group}
                        variant="outlined"
                        onChange={x => setNomination({...nomination, group: x.target.value})}
                        >
                        {groupList.map(x => <MenuItem key={x._id} value={x._id}>{x.numero} {x.nom}</MenuItem>)}
                    </TextField>}
                    {!nomination.groupOnly && <TextField
                        label="Unité"
                        select
                        fullWidth
                        value={nomination.unit}
                        variant="outlined"
                        onChange={x => setNomination({...nomination, unit: x.target.value})}
                        >
                        {unitList.map(x => <MenuItem key={x._id} value={x._id}>{x.numero} {x.nom}</MenuItem>)}
                    </TextField>}
                </div>  
            </div>
        </div>
    )
};

export default PosteStep;