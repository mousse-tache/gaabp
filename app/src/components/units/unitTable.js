import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';

const UnitTable = ({units, canEdit}) => {
  const [state, setState] = React.useState({
    columns: [
      { Id: "Id", field: '_id' },
      { title: 'Numéro', field: 'numero' },
      { title: 'Nom', field: 'nom' },
      { title: 'Ville', field: 'ville' },
    ],
    data: units,
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
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

UnitTable.propTypes = {
    units: Proptypes.array, 
    canEdit: Proptypes.bool,
};

export default UnitTable;
