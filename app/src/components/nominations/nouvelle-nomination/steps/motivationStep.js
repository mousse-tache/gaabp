import React, { useContext, useState, useEffect } from "react";
import { TextField, TextareaAutosize } from "@material-ui/core";
import NominationContext from "../../../../context/nominationContext";
import UserClient from "../../../../clients/userClient";
import { Autocomplete } from "@material-ui/lab";

const MotivationStep = () => {
    const { nomination, setNomination } = useContext(NominationContext);
    const userClient = new UserClient();

    const [allMembers, setAllMembers] = useState([]);
    const [query, setQuery] = useState("")

    useEffect(() => {
        FetchAllUsers();
    }, [query])

    async function FetchAllUsers() {
        if(query.length < 3) {
            return;
        }

        try {               
            var data = await userClient.searchUsers(query);
            if(data !== null)
            {
                setAllMembers(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    const handleChangeFirstUser = (user) => {
        console.log(user);

    };

    return (
        <div className="step-main-container">
            <h2>
                Motivations et recommandations
            </h2>
            <p className="nomination-flex-container">
            Expliquez en quelques mots les raisons pour lesquelles vous voulez être nommé(e) à cette fonction *:</p>
            <div className="nomination-flex-container">
                <TextareaAutosize
                style={{minWidth:"30rem"}}
                rowsMin={5}
                placeholder="Je désire être nommé parce que..." 
                value={nomination.motivation}
                onChange={(e) => setNomination({...nomination, motivation: e.target.value})}
                />
            </div>

            <p className="nomination-flex-container">
            Qui vous recommande? (sélectionner votre supérieur immédiat et un autre membre)</p>
            <div className="nomination-flex-container">
                <Autocomplete        
                    required                   
                    fullWidth={true}
                    autoSelect
                    blurOnSelect                        
                    disableClearable
                    onChange={(event, newValue) => {
                        setNomination({...nomination, approvers: [newValue, nomination.approvers[1]]})
                    }}
                    value={nomination?.approvers[0]}
                    defaultValue={{prenom: "", nom: ""}}
                    options={allMembers}
                    getOptionLabel={(option) => option.prenom + " " + option.nom}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField required {...params} onChange={(event) => setQuery(event.target.value)} label="Supérieur immédiat" />}
                />
            </div>
            <div className="nomination-flex-container">
                <Autocomplete         
                    required               
                    fullWidth={true}
                    autoSelect
                    blurOnSelect                        
                    disableClearable
                    onChange={(event, newValue) => {
                        setNomination({...nomination, approvers: [nomination.approvers[0], newValue]})
                    }}
                    value={nomination?.approvers[1]}
                    defaultValue={{prenom: "", nom: ""}}
                    options={allMembers}
                    getOptionLabel={(option) => option.prenom + " " + option.nom}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField required {...params} onChange={(event) => setQuery(event.target.value)} label="Autre membre" />}
                />
            </div>
        </div>
    );
};

export default MotivationStep;