import React, { useContext, useState } from 'react';
import Proptypes from "prop-types";
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@material-ui/icons/ToggleOnOutlined';

import AppContext from "@aabp/context/app/appContext";

import Permissions from '@aabp/auth/permissions';
import PermissionTypes from '@aabp/auth/permissionTypes';

const UnitTable = ({units}) => {
  const [activeOnly, setActiveOnly] = useState(true);
  const { authedUser } = useContext(AppContext);

  const columns = Permissions(PermissionTypes.ViewRecensementSummary, authedUser) ? 
  [
    { title: 'Nom', field: 'nom' },
    { title: 'Branche', field: 'branche', lookup: {0: "Bleue", 1: "Jaune", 2: "Verte", 3: "Rouge"} },
    { title: 'Genre', field: 'genre', lookup: {0: "Féminin", 1: "Masculin", 2: "Mixte"} },
    { title: "Groupe", field: "group", defaultSort: "asc" },
    { title: "Dernier Recensement", field: "recensements.date" },
    { title: "Recensement payé", field: "paid", render: row => <span className={`recensement-paid-cell recensement-${row.paid}`}>{row.paid}</span> },
    { title: "Statut", field: "a", render: row => row.a ? "Actif" : "Inactif", type: "bool" }
  ] :
  [
      { title: 'Nom', field: 'nom' },
      { title: 'Branche', field: 'branche', lookup: {0: "Bleue", 1: "Jaune", 2: "Verte", 3: "Rouge"} },
      { title: 'Genre', field: 'genre', lookup: {0: "Féminin", 1: "Masculin", 2: "Mixte"} },
      { title: "Groupe", field: "group", defaultSort: "asc" },
      { title: "Actif", field: "a", type: "bool" }
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
      
      actions={[
        {
          icon: activeOnly ? ToggleOnOutlinedIcon : ToggleOffOutlinedIcon,
          tooltip: 'Filtrer les inactifs',
          isFreeAction: true,
          onClick: () => setActiveOnly(!activeOnly) 
        }
      ]}

      columns={columns}
      data={units.map(x => { return {...x, group: x.g ? `${x?.g?.numero} ${x?.g?.nom}` : null, paid: x?.recensements?.paiementComplet ? "Oui" : "Non"};}).filter(x => activeOnly ? x.a : true)}
      onRowClick={(event, rowData) => navigate("/app/unite/"+rowData._id)}

      
    />
  );
};

UnitTable.propTypes = {
    units: Proptypes.array
};

export default UnitTable;
