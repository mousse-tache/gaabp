import React from "react"
import Layout from "./components/layout"

import PropTypes from "prop-types"

const AppAuthenticated = ({username}) => {
    return (        
        <Layout username={username}>  
            <React.Fragment>
            <p>Welcome, {username}. </p>
            </React.Fragment>
        </Layout>
          )
}

AppAuthenticated.propTypes = {
    username: PropTypes.string
}

export default AppAuthenticated
