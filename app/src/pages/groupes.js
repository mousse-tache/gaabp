import { Box, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Card from "@aabp/components/design-system/Card/Card";
import GroupClient from "../clients/groupClient";
import Layout from "../components/public-components/Layout";
import Logo from "../images/Logo_AABP.png";
import Regions from "../utils/regions";

const Groupes = () => {
  const [groupList, setGroupList] = useState(false);
  useEffect(() => {
    FetchGroups();
  }, []);

  const [state, setState] = React.useState(false);

  useEffect(() => {
    if (!groupList) {
      return;
    }

    setState({
      columns: [
        {
          title: "",
          field: "numero",
          render: (rowData) => `${rowData.numero} ${rowData.nom}`,
        },
        { title: "Ville", field: "ville" },
        {
          title: "Région",
          field: "region",
          render: (rowData) =>
            rowData.region ? Regions[rowData.region].nom : null,
        },
        {
          title: "",
          field: "website",
          render: (rowData) =>
            rowData.website ? (
              <a
                href={rowData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Site web
              </a>
            ) : null,
        },
      ],
      data: groupList.filter((x) => x.nom !== "Instances nationales"),
    });
  }, [groupList]);

  const groupClient = new GroupClient();

  async function FetchGroups() {
    try {
      var data = await groupClient.getPublicGroups();
      if (data !== null) {
        setGroupList(data.filter((x) => x.nom !== "Instances nationales"));
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="L'Association des Aventuriers de Baden-Powell est une association d'aventure traditionnelle pour les 7 ans et plus."
        />
        <meta
          name="keywords"
          content="aventure, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association,"
        ></meta>
        <meta
          name="google-site-verification"
          content="Q2zhljR5H-cSJKdJBwFZaky-pEMiHM9NPK2pIgnVm6c"
        />
        <title>AABP | Groupes membres</title>
        <html lang="fr" />
      </Helmet>
      <CssBaseline />
      <Layout>
        <section name="home" className="sitename anchor">
          <Typography className="title-container" variant="h4" gutterBottom>
            <img className="hidden-logo morelinks" src={Logo} alt="Logo AABP" />
            <span>Association des aventuriers de Baden-Powell</span>
          </Typography>
        </section>

        <section>
          <Card>
            <Typography variant="h2">Trouver un groupe</Typography>

            <Box component="h3" lineHeight={2}>
              Entrer le nom d'une ville ou d'une région pour savoir s'il s'y
              trouve un groupe ou consulter la liste de nos groupes.
            </Box>

            {groupList !== false && (
              <MaterialTable
                title=""
                localization={{
                  toolbar: {
                    searchPlaceholder: "Chercher",
                  },
                  body: {
                    deleteTooltip: "Supprimer",
                    editTooltip: "Modifier",
                    addTooltip: "Nouveau",
                  },
                }}
                options={{
                  pageSize: 10,
                  headerStyle: {
                    zIndex: 8,
                  },
                }}
                columns={state?.columns}
                data={state?.data}
              />
            )}
          </Card>
        </section>
      </Layout>
    </div>
  );
};

export default Groupes;
