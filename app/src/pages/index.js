import React from "react"
import { Link} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p><Link to="/account">My Account</Link></p>
  </Layout>
)

export default IndexPage
