import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from "react-helmet";

import LandingPage from "@aabp/components/public-components/LandingPage";
import Layout from "@aabp/components/public-components/Layout";

const IndexPage = () => (
  <div>
    <Helmet>
          <meta name="description" content="L'Association des Aventuriers de Baden-Powell est une association jeunesse traditionnelle pour les 7 ans et plus."/>
          <meta name="keywords" content="aventure, scouts, scoutisme, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association,"></meta>
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