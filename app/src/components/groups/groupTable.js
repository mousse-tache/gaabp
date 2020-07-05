import React, { useEffect } from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

const GroupTable = ({groups, canEdit}) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Numéro', field: 'numero' },
      { title: 'Nom', field: 'nom', defaultSort: "asc" },
      { title: 'Ville', field: 'ville' }
    ],
    data: groups,
  });

  useEffect(() => {
    setState({
      columns: [
        { title: 'Numéro', field: 'numero' },
        { title: 'Nom', field: 'nom', defaultSort: "asc" },
        { title: 'Ville', field: 'ville' }
      ],
      data: groups,
    });
  }, [groups])

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
      options={
        {
          pageSize: 10
        }
      }
      columns={state?.columns}
      data={state?.data}     
      onRowClick={(event, rowData) => canEdit && navigate("/app/groupe/"+rowData._id)}
    />
  );
};

GroupTable.propTypes = {
    groups: Proptypes.array, 
    canEdit: Proptypes.bool,
};

export default GroupTable;
