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
      { title: "Rôle", field: 'nominations', render: row => <span>{row.nominations.filter(x => x.unitId === unitId)[0]?.type}</span> }
      
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
        { title: "Rôle", field: 'nominations', render: row => <span>{row.nominations.filter(x => x.unitId === unitId)[0]?.type}</span>}
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
