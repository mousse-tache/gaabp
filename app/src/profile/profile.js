import React, { useState, useContext } from "react"
import UserContext from "../context/userContext"
import "./profile.css"

import UserClient from "../clients/userClient"

const Profile = () => {
    const user = useContext(UserContext)
    const [courriel, setCourriel] = useState(user.courriel)
    const [prenom, setPrenom] = useState(user.prenom)
    const [nom, setNom] = useState(user.nom)
    
    const userClient = new UserClient();

    async function onSubmit() {       
        await userClient.addUser({courriel: courriel, nom: nom, prenom: prenom});
    }

    return  (
    <section>
        <form onSubmit={onSubmit}>        
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
