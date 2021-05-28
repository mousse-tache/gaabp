import React from "react";
import { Helmet } from "react-helmet";

import { Typography } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from "@aabp/components/public-components/Layout";
import About from "@aabp/components/public-components/About";
import Inscrire from "@aabp/components/public-components/Inscrire";
import Impliquer from "@aabp/components/public-components/Impliquer";
import Contact from "@aabp/components/public-components/Contact";
import ImageCarousel from  "@aabp/components/public-components/ImageCarousel";
import Covid19 from "@aabp/components/public-components/mesures-sanitaires/Covid19";

import Logo from "@aabp/images/Logo_AABP.png";

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
          <span>Association des aventuriers de Baden-Powell</span>
        </Typography>
        <Covid19 />
        <ImageCarousel />
      </section>
      <About/>
      <Inscrire />
      <Impliquer />
      <Contact />    
    </Layout>
  </div>
);
 


export default IndexPage;