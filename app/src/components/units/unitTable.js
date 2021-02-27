import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

const UnitTable = ({units}) => {
  const columns = [
      { title: 'Nom', field: 'nom' },
      { title: 'Branche', field: 'branche', lookup: {0: "Bleue", 1: "Jaune", 2: "Verte", 3: "Rouge"} },
      { title: 'Genre', field: 'genre', lookup: {0: "Féminin", 1: "Masculin", 2: "Mixte"} },
      { title: "Groupe", field: "group", defaultSort: "asc" }
  ];

  return (
    <MaterialTable
      title=""
      localization={{
        toolbar: {
            searchPlaceholder: "Chercher"
        }
    }}
      options={
        {
          pageSize: 10,
          exportButton: true,
          exportAllData: true
        }
      }
      columns={columns}
      data={units.map(x => { return {...x, group: x.g ? `${x?.g?.numero} ${x?.g?.nom}` : null}})}
      onRowClick={(event, rowData) => navigate("/app/unite/"+rowData._id)}
    />
  );
};

UnitTable.propTypes = {
    units: Proptypes.array
};

export default UnitTable;
