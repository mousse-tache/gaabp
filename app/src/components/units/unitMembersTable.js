import React, { useEffect } from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

const UnitMembresTable = ({users, canEdit, unitId}) => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Nom", field:'prenom' },
      { title:"", field:'nom'},
      { title: 'Courriel', field: 'courriel' },
      { title: "Début", field:"sd", type:"date"},
      { title: "Fin", field:"ed", type:"date"},
      { title: "Rôle", field: 'nominations', render: row => row.nominations.filter(x => x.unitId === unitId)[0]?.type }
      
    ],
    data: users,
  });

  useEffect(() => {
    setState(
      {
      columns: [
        { title: "Nom", field:'prenom' },
        { title:"", field:'nom'},
        { title: 'Courriel', field: 'courriel' },
        { title: "Début", field:"sd", type:"date", render: row => row.nominations.filter(x => x.unitId === unitId).sort(function(a, b){return a.sd > b.sd})[0]?.sd},
        { title: "Rôle", field: 'nominations', render: row => row.nominations.filter(x => x.unitId === unitId && !x.ed)[0]?.type}
      ],
      data: users,
    });
  }, [users])

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
          pageSize: 10
        }
      }
      columns={state.columns}
      data={state.data}
      onRowClick={(event, rowData) => navigate("/app/membre/"+rowData.courriel)}
    />
  );
};

UnitMembresTable.propTypes = {
    users: Proptypes.array, 
    canEdit: Proptypes.bool,
    unitId: Proptypes.string
};

export default UnitMembresTable;
