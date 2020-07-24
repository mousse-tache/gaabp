import React from "react"
import PropTypes from "prop-types";

import { Input, Switch, FormControlLabel, InputLabel } from '@material-ui/core';

const MemberDetails = ({member, setMember, canEdit, saveUser, isPersonalProfile}) => {

    return (
        <form onSubmit={saveUser} className="form">    
                
            <h3>Informations de base</h3>
            
            <InputLabel>Courriel</InputLabel>
            <Input type="email" disabled={!(canEdit || isPersonalProfile)} value={member?.courriel} placeholder="robert@badenpowell.ca" onChange={event => setMember({...member, courriel: event.target.value})} />

            <InputLabel>Prénom</InputLabel>
            <Input type="text" value={member?.prenom} disabled={!(canEdit || isPersonalProfile)} placeholder="Robert" onChange={event => setMember({...member, prenom:event.target.value})} />

            <InputLabel>Nom de famille</InputLabel>
            <Input type="text" value={member?.nom} disabled={!(canEdit || isPersonalProfile)} placeholder="Baden-Powell" onChange={event => setMember({...member, nom: event.target.value})} />


            <h3>Informations supplémentaires</h3>
            <div>

            </div>

            <h3>Permissions</h3>
            <FormControlLabel
                disabled={!canEdit}
                control={
                <Switch
                    disabled={!canEdit }
                    checked={member?.isAdmin}
                    onChange={() => setMember({...member, isAdmin: !member.isAdmin})}
                    name="checkedB"
                    className="switch"
                />
                }
                label="Administrateur de la base de donnée"
            />
            
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