import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';

const GroupTable = ({groups, canEdit}) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Numéro', field: 'numero' },
      { title: 'Nom', field: 'nom' },
      { title: 'Ville', field: 'ville' },
    ],
    data: groups,
  });


  return (
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
      columns={state.columns}
      data={state.data}
      
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          })
      }}
    />
  );
};

GroupTable.propTypes = {
    groups: Proptypes.array, 
    canEdit: Proptypes.bool,
};

export default GroupTable;
