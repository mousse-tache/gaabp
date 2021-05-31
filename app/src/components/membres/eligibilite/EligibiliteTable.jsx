import React, { useEffect, useRef, useState } from 'react';
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';
import EligibilityClient from '@aabp/clients/eligibilityClient';
import { useSnackbar } from 'notistack';

import BadgeMapper from "@aabp/components/membres/formation/BadgeMapper";

const EligibiliteTable = ({canEdit}) => {
  const [init, setInit] = useState(false);
  const [data, setData] = useState([]);
  const tableRef = useRef();
  const columns = [
      { title:'', field:'nom', filtering: false },
      { title: 'Courriel', field: 'courriel', filtering: false },      
      {title:'', 
      field:'formations', 
      render: row => <div style={{display:"flex", flexDirection:"row", alignItems:"flex-start", flexWrap:"wrap"}}>
        {
          row.formations.map((x, i) => {
            return <BadgeMapper key={i} badgeId={x} />;
          })
        }
      </div>, 
      filtering:false},
      { title: "Années de service", field: "service",  width: "10%" }
    ];

  const { enqueueSnackbar } = useSnackbar();
  const eligibilityClient = new EligibilityClient();

  async function FetchUsers(page, pageSize, query, status) {
    try {
        console.log(page, pageSize, query, status);
        var { users } = await eligibilityClient.getEligibilityByHonor();
        setData(users);        
    } catch (e) {
        enqueueSnackbar(e.message, {variant: "error"});   
    }
  }

  useEffect(() => {
    FetchUsers();
  }, []);

  useEffect(() => {
    if(init) {
      tableRef.current.onQueryChange();
    }
    else {
      setInit(true);
    }
  }, [canEdit]);

  return (
    <MaterialTable
      tableRef={tableRef}
      title="Éligibilité aux honneurs"
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
          exportFileName : "membres",
          exportAllData: true,
          tableLayout: "fixed"
        }
      }

      data={data}

      columns={columns}
      onRowClick={(event, rowData) => canEdit ? navigate("/app/membre/"+rowData._id) : null}
    />
  );
};

export default EligibiliteTable;