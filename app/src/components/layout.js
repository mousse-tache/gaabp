/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header/header"
import "./layout.css"

const Layout = ({ children, username }) => {

  return (
    <>
      <Header username={username} siteTitle={"Section membres"} />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  username: PropTypes.string
}

export default Layout
