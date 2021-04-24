import React, { useContext, useEffect, useState } from "react";
import { TextField, List, ListItem, Button } from "@material-ui/core";

import CampContext from "@aabp/context/campContext";
import StepAction from "./stepAction";

import UserClient from "@aabp/clients/userClient";

import { Autocomplete } from "@material-ui/lab";

const ChefStep = () => {
    const { camp, setCamp, activeStep, setActiveStep, membres, setMembres } = useContext(CampContext);
    const [searchMembres, setSearchMembres] = useState([]);
    const [query, setQuery] = useState("");

    const userClient = new UserClient();

    const FetchMembres = async() => {
        if(query.length < 3) {
            return;
        }

        try {               
            var data = await userClient.searchUsers(query);
            if(data !== null)
            {
                setSearchMembres(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    };

    useEffect(() => {
        FetchMembres();
    }, [query]);

    
    useEffect(() => {
        const chef = membres.find(x => x.nominations.type === "Chef");
        
        if (chef && !camp.chefUnite) {
            setCamp({...camp, chefUnite: chef, chefCamp: chef});
        }
    }, [membres]);

    useEffect(() => {
        if(camp.chefCamp._id) {
            var newMembres = [...membres];
            var chef = newMembres.find(x => x._id == camp.chefCamp._id);

            if(chef && chef._id == camp.chefUnite._id) {
                return;
            }
            else if (!chef?._id) {
                newMembres = [{...camp.chefCamp, nominations: {...camp.chefCamp.nominations, type: "Chef de camp"}},...membres];
            }

            setMembres(newMembres);
        }

    }, [camp.chefCamp]);

    return  (     
            <div>
                <List>
                    <ListItem>
                        Chef de l'unité:
                    </ListItem>
                    <ListItem>
                    {
                        camp.chefUnite &&
                        <Button>
                            <a href={`/app/membre/${camp.chefUnite._id}`} rel="noreferrer" target="_blank">
                                <span> {camp.chefUnite.prenom} {camp.chefUnite.nom}</span>
                            </a>
                        </Button>
                    }
                    </ListItem>
                    <ListItem>
                        Chef de camp:
                    </ListItem>
                    <ListItem>
                    <Autocomplete                        
                        fullWidth={true}
                        autoSelect
                        blurOnSelect                        
                        disableClearable
                        onChange={(event, newValue) => {
                            setCamp({...camp, chefCamp: newValue});
                        }}
                        value={camp.chefCamp}                        
                        defaultValue={{prenom: "", nom: ""}}
                        options={searchMembres}
                        getOptionLabel={(option) => option.prenom + " " + option.nom}                        
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} onChange={(event) => setQuery(event.target.value)} label="Cherchez un membre" variant="outlined" />}
                    />  
                    {
                        camp.chefCamp &&
                        <Button>
                            <a href={`/app/membre/${camp.chefCamp._id}`} rel="noreferrer" target="_blank">
                                <span>Voir son profil</span>
                            </a>
                        </Button>
                    }
                    </ListItem>
                </List>
                <div>                        
                    <StepAction disabled={!camp.chefCamp} activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>        
    );
};

export default ChefStep;
