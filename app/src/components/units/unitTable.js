import React, { useContext } from 'react';
import Proptypes from "prop-types";
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

import AppContext from "@aabp/context/appContext";

import Permissions from '@aabp/auth/permissions';
import PermissionTypes from '@aabp/auth/permissionTypes';

const UnitTable = ({units}) => {
  const { authedUser } = useContext(AppContext);

  const columns = Permissions(PermissionTypes.ViewRecensementSummary, authedUser) ? 
  [
    { title: 'Nom', field: 'nom' },
    { title: 'Branche', field: 'branche', lookup: {0: "Bleue", 1: "Jaune", 2: "Verte", 3: "Rouge"} },
    { title: 'Genre', field: 'genre', lookup: {0: "Féminin", 1: "Masculin", 2: "Mixte"} },
    { title: "Groupe", field: "group", defaultSort: "asc" },
    { title: "Dernier Recensement", field: "recensements.date" },
    { title: "Recensement payé", field: "paid", render: row => <span className={`recensement-paid-cell recensement-${row.paid}`}>{row.paid}</span> },
  ] :
  [
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
      data={units.map(x => { return {...x, group: x.g ? `${x?.g?.numero} ${x?.g?.nom}` : null, paid: x?.recensements?.paiementComplet ? "Oui" : "Non"};})}
      onRowClick={(event, rowData) => navigate("/app/unite/"+rowData._id)}
    />
  );
};

UnitTable.propTypes = {
    units: Proptypes.array
};

export default UnitTable;
