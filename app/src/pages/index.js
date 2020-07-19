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

const IndexPage = () => (
  <div>
    <Helmet>
          <meta name="description" content="L'Association des Aventuriers de Baden-Powell est une association de scoutisme traditionnel pour les 7 ans et plus."/>
          <title>AABP | Scoutisme traditionnel</title>
          <html lang="fr" />
    </Helmet>
    <CssBaseline />
    <Layout>  
      <section name="home" className="sitename anchor">
      <Typography variant="h4" gutterBottom>Association des Aventuriers de Baden-Powell</Typography>
      </section>
      <ImageCarousel />
      <About/>
      <Inscrire />
      <Impliquer />
      <Contact />    
    </Layout>
  </div>
)
 


export default IndexPage