import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';

const UnitTable = ({units, canEdit, groups}) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nom', field: 'nom' },
      { title: 'Branche', field: 'branche', lookup: {0: "Bleue", 1: "Jaune", 2: "Vert", 3: "Rouge"} },
      { title: 'Genre', field: 'genre', lookup: {0: "Masculin", 1: "Féminin", 2: "Mixte"} },
      { title: "Groupe", field: "group", render: row => <span>{groups.filter(x => x._id == row.group)[0]?.nom}</span> }
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
      onRowClick={(event, rowData) => window.location.href =  "/app/unite/"+rowData._id}
    />
  );
};

UnitTable.propTypes = {
    units: Proptypes.array, 
    canEdit: Proptypes.bool,
    groups: Proptypes.array
};

export default UnitTable;
