import React from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';
import UserClient from '../../clients/userClient';
import { useSnackbar } from 'notistack';
import { CsvBuilder } from 'filefy';

const MembresTable = ({canEdit}) => {
  const columns = [
      { title:'', field:'nom', filtering: false },
      { title: 'Courriel', field: 'courriel', filtering: false },
      { title: 'Statut', 
        field: 'statut', lookup: {0: 'Inactif', 1: 'Actif'},
        filtering: true,
        tooltip: 'Un membre est actif s\'il a au moins une nomination courante'
      }
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

  const exportCsv = async () => {
    const allData = await userClient.getEmailContact();

    const exportedData = allData.map(rowData => columns.map(columnDef => rowData[columnDef.field]));
    new CsvBuilder('membres')
      .setDelimeter(';')
      .setColumns(columns.map(columnDef => columnDef.title))
      .addRows(exportedData)
      .exportFile();
  };

  return (
    <MaterialTable
      title=""
      localization={{
        toolbar: {
            searchPlaceholder: "Chercher",
            exportCSVName: "Exporter les contacts"
        }
      }}
      options={
        {
          pageSize: 10,
          exportButton: canEdit,
          exportCsv: exportCsv,
          exportFileName : "membres",
          exportAllData: true
        }
      }

      data={query =>
        new Promise(async(resolve, reject) => {
          console.log(query);
          var { users, count, page } = await FetchUsers(query.page+1, query.pageSize, query.search);
          var filteredUsers = [];
          if(users.length > 0) {
            users.forEach(x => {
              filteredUsers.push(
                {"_id": x._id, 
                courriel: x.courriel, 
                nom: `${x.prenom} ${x.nom}`, 
                statut: (x?.nominations && x.nominations.filter(x => !x.ed).length > 0) ? 1 : 0
              })
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
