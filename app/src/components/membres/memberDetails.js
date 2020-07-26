import React from "react"
import PropTypes from "prop-types";

import { Input, Switch, FormControlLabel, InputLabel, TextField, Button } from '@material-ui/core';

const MemberDetails = ({member, setMember, canEdit, saveUser, isPersonalProfile}) => {

    return (
        <form onSubmit={saveUser} className="form">    
                

            <div>

            <h3>Informations de base</h3>
            
            <TextField fullWidth label="Courriel" type="email" disabled={!(canEdit || isPersonalProfile)} value={member?.courriel} placeholder="robert@badenpowell.ca" onChange={event => setMember({...member, courriel: event.target.value})} />
            
            <TextField 

            fullWidth={true}
            type="text" 
            value={member?.prenom}
            label="Prénom" 
            disabled={!(canEdit || isPersonalProfile)} 
            placeholder="Robert" 
            onChange={event => setMember({...member, prenom:event.target.value})} />
            
            <TextField

            fullWidth={true}
            type="text" 
            label="Nom de famille" 
            value={member?.nom} 
            disabled={!(canEdit || isPersonalProfile)} 
            placeholder="Baden-Powell" 
            onChange={event => setMember({...member, nom: event.target.value})} />


            <TextField
                fullWidth={true}
                disabled={!(canEdit || isPersonalProfile)}
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={(event) => {            
                    setMember({...member, details: {...member?.details, ddn: event.target.value}});
                }}
                value={member?.details?.ddn}
                label="Date de naissance" 
                type="date"
            />     
            </div>

            <div>   
            <h3>Informations supplémentaires</h3>
             <TextField
                fullWidth={true}
                disabled={!(canEdit || isPersonalProfile)}
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={(event) => {            
                    setMember({...member, details: {...member?.details, totem: event.target.value}});
                }}
                value={member?.details?.totem}
                label="Nom de totem" 
                variant="outlined"
                type="text"
            />     

            </div>

            <h3>Permissions</h3>
            <FormControlLabel
                disabled={!canEdit}
                control={
                <Switch
                    disabled={!canEdit }
                    checked={member?.isAdmin}
                    onChange={() => setMember({...member, isAdmin: !member?.isAdmin})}
                    name="checkedB"
                    className="switch"
                />
                }
                label="Administrateur de la base de donnée"
            />
            <div className="submit-button">
                <Button variant="contained" color="secondary" 
                    disabled={!(canEdit || isPersonalProfile)}
                    onClick={saveUser}>
                        {member?._id ? "Sauvegarder" : "Compléter l'inscription"}
                </Button>
            </div>                    
        </form>
    )
};

MemberDetails.propTypes = {
    member: PropTypes.object,
    setMember: PropTypes.func,
    canEdit: PropTypes.bool,
    isPersonalProfile: PropTypes.bool
}

export default MemberDetails;