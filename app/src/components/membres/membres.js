import React, { useState, useEffect } from "react"
import Loading from "../loading/loading"

import UserClient from "../../clients/userClient"

const Membres = () => {
    const [userList, setUserList] = useState([])
    const [courriel, setCourriel] = useState("");
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [id, setId] = useState(false)
    const [isFetchingUserList, setIsFetchingUserList] = useState(true);
    
    const userClient = new UserClient();

    useEffect(() => {
        FetchUsers();
    }, [])

    async function FetchUsers() {
        try {               
            var data = await userClient.getUsers();
            if(data !== null)
            {
                setUserList(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }

        setIsFetchingUserList(false);
    }

    async function saveUser(e) {           
        e.preventDefault();
        e.stopPropagation();    
        if(id) {
            await userClient.updateUser({id:id, courriel: courriel, nom: nom, prenom: prenom});
            FetchUsers();
        }
        else {
            await userClient.addUser({courriel: courriel, nom: nom, prenom: prenom});
            FetchUsers();
        }

    }

    if(isFetchingUserList) {
        return (<Loading />)
    }


    return  (
    <section className="profile">
        <form onSubmit={saveUser}>        
            <h3>Liste des membres</h3>
            <label>Courriel</label>
            <input type="text" value={courriel} placeholder="robert@badenpowell.ca" onChange={event => setCourriel(event.target.value)} />

            <label>Prénom</label>
            <input type="text" value={prenom} placeholder="Robert" onChange={event => setPrenom(event.target.value)} />

            <label>Nom de famille</label>
            <input type="text" value={nom} placeholder="Baden-Powell" onChange={event => setNom(event.target.value)} />

            <input type="submit" value="Ajouter un membre" />
        </form>
        <ol>
    {userList.map(x => <li>{x.courriel} {x.prenom} {x.nom}</li>)}
        </ol>
    </section>
    )
}

export default Membres
