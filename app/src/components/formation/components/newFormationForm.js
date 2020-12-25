import React, { useEffect, useState } from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Permissions from "../../../auth/permissions";
import PermissionTypes from "../../../auth/permissionTypes";
import Branches from "../../../utils/branches";
import Formations from "../../../utils/formations";

const NewFormationForm = ({authedUser, setSelectUser, selectUser, queriedUsers, setQuery, formation, setFormation, addFormation}) => {
    const [errorText, setErrorText] = useState(null);

    useEffect(() => {
        if(selectUser.formations.filter(x => x.niveau?.id === formation.niveau.id).length > 0 && selectUser.formations.filter(x => x.branche?.couleur === formation.branche.couleur).length > 0)
        {
            setErrorText("Ce membre a déjà été recommandé pour cette formation");
        }
        else if (errorText !== null) {
            setErrorText(null);
        }
    }, [formation]);

    return (
        <Card className="formation-recommender-card">
            <Autocomplete
                fullWidth={true}
                disabled={!Permissions(PermissionTypes.RecommendFormation)}
                autoComplete
                autoSelect                     
                disableClearable
                onChange={(event, newValue) => {
                    setSelectUser(newValue);
                }}
                value={selectUser}
                options={queriedUsers}
                getOptionLabel={(option) => option.prenom + " " + option.nom}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} onChange={(event) => setQuery(event.target.value)} required label="Membre" variant="outlined" />}
            />
            <Autocomplete
                fullWidth={true}
                disabled={!Permissions(PermissionTypes.RecommendFormation)}
                autoComplete
                autoSelect                    
                disableClearable
                onChange={(event, newValue) => {
                    setFormation({...formation, niveau: newValue});
                }}
                value={formation.niveau}
                options={Formations}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} required label="Niveau" variant="outlined" />}
            />
            <Autocomplete
                fullWidth={true}
                disabled={!Permissions(PermissionTypes.RecommendFormation)}
                autoComplete
                autoSelect
                required                      
                disableClearable
                onChange={(event, newValue) => {                    
                    setFormation({...formation, branche: newValue});
                }}
                value={formation.branche}
                options={Branches}
                getOptionLabel={(option) => option.couleur}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} required label="Branche" variant="outlined" 
                error= {selectUser.formations.filter(x => x.niveau?.id === formation.niveau.id && x.branche?.couleur === formation.branche.couleur).length > 0}
                helperText={errorText} />}
            />     

             <TextField
                fullWidth={true}
                disabled={!Permissions(PermissionTypes.RecommendFormation)}
                required
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={(event) => {            
                    setFormation({...formation, dateRecommende: event.target.value});
                }}
                value={formation.dateRecommende}
                style={{ width: 300 }}
                label="Date de la recommandation" 
                variant="outlined"
                type="date"
            />       
            <div>
                <Button 
                    variant={selectUser?._id !== null ? "contained" : "outlined"} 
                    
                    color={selectUser?._id !== null ? "primary" : "secondary"} 
                    hidden={!Permissions(PermissionTypes.RecommendFormation)}
                    disabled={!Permissions(PermissionTypes.RecommendFormation) || 
                        selectUser._id === 0 || 
                        formation.branche.couleur === "" || 
                        formation.niveau.id === "" ||
                        selectUser.formations.filter(x => x.niveau?.id === formation.niveau.id &&
                             x.branche?.couleur === formation.branche.couleur).length > 0     
                         }  
                    onClick={addFormation}
                    >
                        Recommander
                </Button>
            </div>            
        </Card>        
    )
}

export default NewFormationForm;