import React, { useContext } from "react"
import PropTypes from "prop-types";

import { Switch, FormControlLabel, TextField, Button } from '@material-ui/core';
import AnneesService from "./anneesService";
import AppContext from "@aabp/context/appContext";

const MemberDetails = ({member, setMember, canEdit, saveUser, isPersonalProfile}) => {
    const { authedUser } = useContext(AppContext);

    return (
        <form onSubmit={saveUser} className="form"> 
            <div>
                <h3>Informations de base</h3>
                
                <TextField fullWidth label="Courriel" type="email" disabled={(!canEdit || isPersonalProfile)} value={member?.courriel} placeholder="robert@badenpowell.ca" onChange={event => setMember({...member, courriel: event.target.value})} />
                
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

                {
                    (canEdit || isPersonalProfile) &&
                    (
                    <div>
                        <h3>Informations personnelles</h3>
                        <TextField
                            fullWidth
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

                        <TextField
                            fullWidth={true}
                            disabled={!(canEdit || isPersonalProfile)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {            
                                setMember({...member, details: {...member?.details, phone: event.target.value}});
                            }}
                            value={member?.details?.phone}
                            label="Numéro de téléphone" 
                            type="string"
                        />

                        <TextField
                            fullWidth={true}
                            disabled={!(canEdit || isPersonalProfile)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {            
                                setMember({...member, details: {...member?.details, addresse: event.target.value}});
                            }}
                            value={member?.details?.addresse}
                            label="Addresse complète" 
                            type="string"
                        />            
                    </div>
                    )
                }
                
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
                <AnneesService nominations={member?.nominations ?? []} />    

                </div>

                {authedUser && 
                    (
                    <div>
                        <h3>Permissions</h3>
                        <FormControlLabel
                            disabled={!authedUser?.isAdmin}
                            control={
                            <Switch
                                disabled={!authedUser?.isAdmin}
                                checked={member?.isAdmin}
                                onChange={() => setMember({...member, isAdmin: !member?.isAdmin})}
                                name="checkedB"
                                className="switch"
                            />
                            }
                            label="Administrateur de la base de donnée"
                        />
                    </div>
                    )
                }
                <div className="submit-button">
                    <Button variant="contained" color="secondary" 
                        disabled={!(canEdit || isPersonalProfile)}
                        onClick={saveUser}>
                            {member?._id ? "Sauvegarder" : "Compléter l'inscription"}
                    </Button>
                </div>        
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