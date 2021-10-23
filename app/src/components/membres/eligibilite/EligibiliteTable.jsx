import React, { useContext, useEffect, useRef, useState } from 'react';
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';
import { useSnackbar } from 'notistack';

import EligibilityClient from '@aabp/clients/eligibilityClient';
import EligibliteContext from "@aabp/context/eligibiliteContext";

import BadgeMapper from "@aabp/components/membres/formation/BadgeMapper";

const EligibiliteTable = ({canEdit}) => {
  const honors = useContext(EligibliteContext);
  const [init, setInit] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef();
  const columns = [
      { title:'', field:'nom', filtering: false },
      { title: 'Courriel', field: 'courriel', filtering: false },  
      { title: 'Éligible pour', field: 'honor', filtering: false },      
      {title:'', 
      field:'formations', 
      render: row => <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent: "center", flexWrap:"wrap"}}>
        {
          row.formations ? row.formations.map((x, i) => {
            return <BadgeMapper key={i} badgeId={x.niveau.id} branche={x.branche.couleur} />;
          }) : ""
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
    const { buchettes, provalore, snm } = honors;

    var users = [];
    var f;

    if(buchettes) {
      f = data.filter(x => x.service >= 5 && x.formations && x.formations.filter(u => u.niveau.id == "8").length > 0).map(x => {return {...x, honor: "Bûchettes"};});
      users = users.concat(f);
    }

    if(provalore) {
      f = data.filter(x => x.service >= 15);
      users = users.concat(f);
    }

    if(snm) {
      f = data.filter(x => x.serviceNational >= 5);
      users = users.concat(f);
    }

    if(!(buchettes || provalore || snm)) {
      setFilteredData(data);
    }    
    else {
      setFilteredData(users);
    }
  }, [honors, data]);

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

      data={filteredData}

      columns={columns}
      onRowClick={(event, rowData) => canEdit ? navigate("/app/membre/"+rowData._id) : null}
    />
  );
};

export default EligibiliteTable;