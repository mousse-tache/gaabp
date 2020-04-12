import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../components/about"
import Inscrire from "../components/inscrire"
import Impliquer from "../components/impliquer"
import Contact from "../components/contact"


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
