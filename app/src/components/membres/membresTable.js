import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';

const MembresTable = ({users, canEdit}) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Prénom', field: 'prenom' },
      { title: 'Nom de famille', field: 'nom' },
      { title: 'Courriel', field: 'courriel' },
    ],
    data: users,
  });

  const editableFunctions = {
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
  }

  var editable = {};

  if(canEdit) {
    editable = editableFunctions;
  }

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
      options={
        {
          pageSize: 10
        }
      }
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Modifier',
          onClick: (event, rowData) => window.location.href =  "/app/membre/"+rowData.courriel
        }
      ]
      }
    />
  );
};

MembresTable.propTypes = {
    users: Proptypes.array, 
    canEdit: Proptypes.bool
};

export default MembresTable;
