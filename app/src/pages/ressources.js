import { Box, Grid, Link, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Helmet } from "react-helmet";
import Layout from "../components/public-components/Layout";

import Card from "@aabp/components/design-system/Card/Card";
import Reglements from "../components/ressources/reglements/reglements";
import Logo from "../images/Logo_AABP.png";

const ReglementsPage = () => (
  <div>
    <Helmet>
      <meta
        name="description"
        content="Ressources et règlements de l'Association des Aventuriers de Baden-Powell."
      />
      <meta
        name="keywords"
        content="aventure, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association,"
      ></meta>
      <meta
        name="google-site-verification"
        content="Q2zhljR5H-cSJKdJBwFZaky-pEMiHM9NPK2pIgnVm6c"
      />
      <title>AABP | Règlements</title>
      <html lang="fr" />
    </Helmet>
    <CssBaseline />
    <Layout>
      <section name="home" className="sitename anchor">
        <Typography className="title-container" variant="h4" gutterBottom>
          <Link href="/">
            <img className="hidden-logo" src={Logo} alt="Logo AABP" />
          </Link>
          <span>Association des aventuriers de Baden-Powell</span>
        </Typography>
      </section>
      <Card id="reglements">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box lineHeight={2}>
              <h2>Règlements de l'Association</h2>
              <Box lineHeight={2}>
                <h4>
                  À l'Association des aventuriers de Baden-Powell, les
                  règlements sont soumis au vote à l'Assemblée générale annuelle
                  où tous les membres titulaires sont invités à prendre part.
                </h4>
              </Box>
              <Reglements />
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Card>
    </Layout>
  </div>
);

export default ReglementsPage;
