import React from "react";
import Layout from "../components/public-components/Layout";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Paper, Box, Grid, Link } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Logo from "../images/Logo_AABP.png"
import Reglements from "../components/ressources/reglements/reglements";

const ReglementsPage = () => (
  <div>
    <Helmet>
          <meta name="description" content="L'Association des Aventuriers de Baden-Powell est une association de scoutisme traditionnel pour les 7 ans et plus."/>
          <meta name="keywords" content="scout, scoutisme, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association,"></meta>
          <meta name="google-site-verification" content="Q2zhljR5H-cSJKdJBwFZaky-pEMiHM9NPK2pIgnVm6c" />
          <title>AABP | Règlements</title>
          <html lang="fr" />
    </Helmet>
    <CssBaseline />
    <Layout>  
      <section name="home" className="sitename anchor">
      <Typography className="title-container" variant="h4" gutterBottom> 
        <Link href="/">
            <img className="hidden-logo" src={Logo} alt="Logo AABP"/>
        </Link>
        <span>Association des aventuriers de Baden-Powell</span>
      </Typography>
      </section>
      <Paper id="reglements">
          <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box lineHeight={2}>
                        <h2 >Règlements de l'Assocation</h2>
                        <Box lineHeight={2}>
                            <h4>
                            À l'Association des aventuriers de Baden-Powell, les règlements sont soumis au vote à l'Assemblée générale annuelle où tous les membres titulaires sont invités à prendre part.
                            </h4>
                        </Box>
                        <Reglements />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    
                </Grid>
          </Grid>
      </Paper>
    </Layout>
  </div>
)
 


export default ReglementsPage;