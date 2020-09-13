import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';
import UserClient from '../../clients/userClient';
import { useSnackbar } from 'notistack';

const MembresTable = ({canEdit}) => {
  const columns = [
      { title:"", field:'nom'},
      { title: 'Courriel', field: 'courriel' },
    ];

    const { enqueueSnackbar } = useSnackbar();
    const userClient = new UserClient();

    async function FetchUsers(page, pageSize, query) {
      try {               
          var data = await userClient.getPagedUsers(page, pageSize, query);
          return data;         
      } catch (e) {
          enqueueSnackbar(e.message, {variant: "error"});   
      }
  }

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

      data={query =>
        new Promise(async(resolve, reject) => {
          var { users, count, page } = await FetchUsers(query.page+1, query.pageSize, query.search);
          var filteredUsers = [];
          if(users.length > 0) {
            users.forEach(x => {
              filteredUsers.push({"_id": x._id, courriel: x.courriel, nom: `${x.prenom} ${x.nom}`})
            })
          }
            resolve({
                data: filteredUsers,
                page: page-1,
                totalCount: count
            });
        })
      }

      columns={columns}
      onRowClick={(event, rowData) => canEdit ? navigate("/app/membre/"+rowData._id) : null}
    />
  );
};

MembresTable.propTypes = {
    canEdit: Proptypes.bool
};

export default MembresTable;
