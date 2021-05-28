import React from "react";
import { Helmet } from "react-helmet";
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from "@aabp/components/public-components/Layout";
import LandingPage from "@aabp/components/public-components/LandingPage";

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
      <LandingPage />   
    </Layout>
  </div>
);
 


export default IndexPage;