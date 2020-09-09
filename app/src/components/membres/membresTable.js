import React, { useEffect, useState } from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

const MembresTable = ({users, canEdit}) => {
  const [state, setState] = React.useState({
    columns: [
      { title:"", field:'nom', defaultSort: "asc"},
      { title: 'Courriel', field: 'courriel' },
    ],
    data: [],
  });

  useEffect(() => {
    var filteredUsers = [];

    users.forEach(x => {
      filteredUsers.push({"_id": x._id, courriel: x.courriel, nom: `${x.prenom} ${x.nom}`})
    })

    setState(
      {
      columns: [
        { title:"", field:'nom', defaultSort: "asc"},
        { title: 'Courriel', field: 'courriel' },
      ],
      data: filteredUsers,
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
      onRowClick={(event, rowData) => navigate("/app/membre/"+rowData._id)}
    />
  );
};

MembresTable.propTypes = {
    users: Proptypes.array, 
    canEdit: Proptypes.bool
};

export default MembresTable;
