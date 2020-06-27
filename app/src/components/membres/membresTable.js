import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

const MembresTable = ({users, canEdit}) => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Nom", field:'prenom' },
      { title:"", field:'nom'},
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

MembresTable.propTypes = {
    users: Proptypes.array, 
    canEdit: Proptypes.bool
};

export default MembresTable;
