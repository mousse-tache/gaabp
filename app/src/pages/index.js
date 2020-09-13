import React from "react";
import Layout from "../components/public-components/layout";
import About from "../components/public-components/about";
import Inscrire from "../components/public-components/inscrire";
import Impliquer from "../components/public-components/impliquer";
import Contact from "../components/public-components/contact";
import CssBaseline from '@material-ui/core/CssBaseline';
import ImageCarousel from  "../components/public-components/imageCarousel";
import { Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Logo from "../images/Logo_AABP.png"

const IndexPage = () => (
  <div>
    <Helmet>
          <meta name="description" content="L'Association des Aventuriers de Baden-Powell est une association de scoutisme traditionnel pour les 7 ans et plus."/>
          <meta name="keywords" content="scout, scoutisme, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association,"></meta>
          <meta name="google-site-verification" content="Q2zhljR5H-cSJKdJBwFZaky-pEMiHM9NPK2pIgnVm6c" />
          <title>AABP | Scoutisme traditionnel</title>
          <html lang="fr" />
    </Helmet>
    <CssBaseline />
    <Layout>  
      <section name="home" className="sitename anchor">
      <Typography className="title-container" variant="h4" gutterBottom> 
        <img className="morelinks hidden-logo" src={Logo} alt="Logo AABP"/>
        <span>Association des Aventuriers de Baden-Powell</span>
        <ImageCarousel />
      </Typography>
      </section>
      <About/>
      <Inscrire />
      <Impliquer />
      <Contact />    
    </Layout>
  </div>
)
 


export default IndexPage