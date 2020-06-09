import React, { useState, useContext, useEffect } from "react"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import "./profile.css"

import UserClient from "../../clients/userClient"

const Profile = () => {
    const user = useContext(UserContext)
    const [courriel, setCourriel] = useState(user.courriel)
    const [prenom, setPrenom] = useState(user.prenom)
    const [nom, setNom] = useState(user.nom)
    const [id, setId] = useState(false)
    const [isFecthingUser, setIsFetchingUser] = useState(true);
    
    const userClient = new UserClient();

    useEffect(() => {
        FetchUser();
    })

    async function FetchUser() {
        try {               
            var data = await userClient.getByEmail(user.courriel);
            if(data !== null)
            {
                setNom(data[0].nom.toString());
                setPrenom(data[0].prenom.toString());
                setId(data[0]._id.toString());
            }            
        } catch (e) {
            console.log(e.message);   
        }

        setIsFetchingUser(false);
    }

    async function saveUser(e) {           
        e.preventDefault();
        e.stopPropagation();    
        if(id) {
            await userClient.updateUser({id:id, courriel: courriel, nom: nom, prenom: prenom});
        }
        else {
            await userClient.addUser({courriel: courriel, nom: nom, prenom: prenom});
        }

    }

    if(isFecthingUser) {
        return (<Loading />)
    }


    return  (
    <section className="profile">
        <form onSubmit={saveUser}>        
            <h3>Informations de base</h3>
            <label>Courriel</label>
            <input type="text" value={courriel} placeholder="robert@badenpowell.ca" onChange={event => setCourriel(event.target.value)} />

            <label>Prénom</label>
            <input type="text" value={prenom} placeholder="Robert" onChange={event => setPrenom(event.target.value)} />

            <label>Nom de famille</label>
            <input type="text" value={nom} placeholder="Baden-Powell" onChange={event => setNom(event.target.value)} />

            <input type="submit" value="Sauvegarder" />
        </form>
    </section>
    )
}

export default Profile
