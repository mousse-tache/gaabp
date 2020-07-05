import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField } from "@material-ui/core";
import GroupClient from "../../clients/groupClient";
import { Helmet } from "react-helmet";
import MaterialTable from 'material-table';
import Regions from "../../utils/regions";
import { navigate } from 'gatsby';

const Impliquer = () => {
  const [groupList, setGroupList] = useState(false);

  useEffect(() => {
      FetchGroups();
  }, [])

  const [state, setState] = React.useState(false);

  useEffect(() => {
    if(!groupList) {
      return;
    }

    setState({
      columns: [
        { title: '', field: 'numero', render: rowData => `${rowData.numero} ${rowData.nom}` },
        { title: 'Ville', field: 'ville' },
        { title: 'Région', field: 'region', render: rowData => rowData.region ? Regions[rowData.region].nom : null}

      ],
      data: groupList.filter(x => x.nom != "Instances nationales"),
    });
  }, [groupList])

  const groupClient = new GroupClient();

  async function FetchGroups() {
      try {               
          var data = await groupClient.getGroups();
          if(data !== null)
          {
              setGroupList(data.filter(x => x.nom !== "Instances nationales"));
          }            
      } catch (e) {
          console.log(e.message);   
      }
  }

  return (
    <section>
      <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></Helmet> 
      <div className="break" id="impliquer"></div>
      <Card>
        <CardContent>
          <Typography variant="h4">S'impliquer</Typography>
          <Typography>
            L'Association des Aventuriers de Baden-Powell est constamment à la recherche de bénévoles pour s'occuper de nos scouts. Pour ce faire, il y aura vérification des antécédents judiciaires de l'intéressé qu'il ne présente pas de risque. L'intéressé devra également être en contact avec le groupe dans lequel il désire s'impliquer et ses membres pourront le guider le processus. Il n'est pas nécessaire d'avoir été scout par le passé pour s'impliquer, il faut seulement avoir le désir de donner de son temps pour contribuer au développement des jeunes que nous accompagnons.
          </Typography>
        </CardContent>
      </Card>
      <section>
      <Card>
        <Typography variant="h4">Trouver un groupe</Typography>
        <Typography>Entrer le nom d'une ville pour savoir s'il s'y trouve un groupe ou consulter la liste de nos groupes.</Typography>
        {groupList !== false && 
        <MaterialTable
          title=""
          localization={{
            toolbar: {
                searchPlaceholder: "Chercher"
            },
            body: {
                deleteTooltip: "Supprimer",
                editTooltip: "Modifier",
                addTooltip: "Nouveau"
            }
        }}
          options={
            {
              pageSize: 10,
              headerStyle: {
                zIndex: 8
              }
            }
          }
          columns={state?.columns}
          data={state?.data}     
    />}



      </Card>
      </section>
      
    </section>
  )
}

export default Impliquer
