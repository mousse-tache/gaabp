import React from "react"
import Layout from "../components/public-components/layout"
import SEO from "../components/public-components/seo"
import About from "../components/public-components/about"
import Inscrire from "../components/public-components/inscrire"
import Impliquer from "../components/public-components/impliquer"
import Contact from "../components/public-components/contact"

const IndexPage = () => (
  <Layout>
    <SEO title="Accueil" />
    <section name="home" className="sitename">
    <h1>L'Association des Aventuriers de Baden-Powell</h1>
    </section>
    <About/>
    <Inscrire />
    <Impliquer />
    <Contact />    
  </Layout>
)

export default IndexPage
