import React from "react"
import Layout from "./components/layout"
import Profile from "./profile/profile"
import UserContext from "./context/userContext"
import PropTypes from "prop-types"

const AppAuthenticated = ({user}) => {

    return (        
        <UserContext.Provider value={{courriel: user.email, nomcomplet:user.name}}>
            <Layout username={user.name}>  
                <p>Salut, {user.name}. </p>
                <Profile></Profile>
            </Layout>
        </UserContext.Provider>
          )
}

AppAuthenticated.propTypes = {
    username: PropTypes.string
}

export default AppAuthenticated
