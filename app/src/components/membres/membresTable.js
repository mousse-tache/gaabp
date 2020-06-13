import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';

const MembresTable = ({users, title}) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Prénom', field: 'prenom' },
      { title: 'Nom de famille', field: 'nom' },
      { title: 'Courriel', field: 'courriel' },
    ],
    data: users,
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

MembresTable.propTypes = {
    users: Proptypes.array, 
    title: Proptypes.func
};

export default MembresTable;
