import React from "react"
import Layout from "./components/layout"

import PropTypes from "prop-types"

import {Text, View} from 'react-native';


const AppAuthenticated = ({username}) => {
    return (        
        <View>
            <Layout username={username}>  
                <Text>
                <p>Welcome, {username}. </p>
                </Text>
            </Layout>
        </View>
          )
}

AppAuthenticated.propTypes = {
    username: PropTypes.string
}

export default AppAuthenticated
