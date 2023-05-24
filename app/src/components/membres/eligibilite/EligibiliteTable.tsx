import { navigate } from "gatsby";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useRef, useState } from "react";

import EligibilityClient from "@aabp/clients/eligibilityClient";
import EligibliteContext from "@aabp/context/eligibiliteContext";

import BadgeMapper from "@aabp/components/membres/formation/BadgeMapper";

const EligibiliteTable = (): React.ReactNode => {
  const honors = useContext(EligibliteContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef();
  const columns = [
    { title: "Nom", field: "nom", filtering: false },
    { title: "Courriel", field: "courriel", filtering: false },
    {
      title: "Éligible pour",
      field: "honors",
      filtering: false,
    },
    {
      title: "Éligible pour Service National Méritoire",
      field: "eligibleServiceNational",
      filtering: false,
      width: "10%",
      type: "boolean",
    },
    {
      title: "Éligible pour Bûchettes",
      field: "eligibleBuchettes",
      filtering: false,
      width: "10%",
      type: "boolean",
    },
    {
      title: "Éligible pour Pro Valore Sua",
      field: "eligibleProvalore",
      filtering: false,
      width: "10%",
      type: "boolean",
    },
    {
      title: "",
      field: "formations",
      render: (row) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {row.formations
            ? row.formations.map((x, i) => {
                return (
                  <BadgeMapper
                    key={i}
                    badgeId={x.niveau.id}
                    branche={x.branche.couleur}
                  />
                );
              })
            : ""}
        </div>
      ),
      filtering: false,
      export: false,
    },
    { title: "Années de service", field: "service", width: "10%" },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const eligibilityClient = new EligibilityClient();

  async function FetchUsers(page, pageSize, query, status) {
    try {
      console.log(page, pageSize, query, status);
      const { users } = await eligibilityClient.getEligibilityByHonor();
      setData(users);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }

  useEffect(() => {
    FetchUsers();
  }, []);

  useEffect(() => {
    const { buchettes, provalore, snm } = honors;

    let users = [];
    let f;

    if (buchettes) {
      f = data.filter((x) => x.eligibleBuchettes);
      users = users.concat(f);
    }

    if (provalore) {
      f = data.filter((x) => x.eligibleProvalore);
      users = users.concat(f);
    }

    if (snm) {
      f = data.filter((x) => x.eligibleServiceNational >= 5);
      users = users.concat(f);
    }

    if (!(buchettes || provalore || snm)) {
      setFilteredData(data);
    } else {
      setFilteredData(users);
    }
  }, [honors, data]);

  return (
    <MaterialTable
      tableRef={tableRef}
      title="Éligibilité aux honneurs"
      localization={{
        toolbar: {
          searchPlaceholder: "Chercher",
          exportCSVName: "Export CSV",
        },
      }}
      options={{
        pageSize: 10,
        exportButton: true,
        exportFileName: "eligibilité",
        exportAllData: true,
        tableLayout: "fixed",
      }}
      data={filteredData}
      columns={columns}
      onRowClick={(event, rowData) => navigate("/app/membre/" + rowData._id)}
    />
  );
};

export default EligibiliteTable;
