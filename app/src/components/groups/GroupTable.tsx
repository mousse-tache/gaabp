import Regions from "@aabp/utils/regions";
import { navigate } from "gatsby";
import MaterialTable from "material-table";
import React, { useEffect } from "react";

const GroupTable = ({
  groups,
  canSee,
}: {
  groups: Array<unknown>
  canSee: boolean
}): React.ReactNode => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Numéro", field: "numero" },
      { title: "Nom", field: "nom", defaultSort: "asc" },
      { title: "Ville", field: "ville" },
      { title: "Région", field: "region" },
    ],
    data: groups,
  });

  useEffect(() => {
    setState({
      columns: [
        { title: "Numéro", field: "numero" },
        { title: "Nom", field: "nom", defaultSort: "asc" },
        { title: "Ville", field: "ville" },
        { title: "Région", field: "region" },
      ],
      data: groups.map((x) => {
        return { ...x, region: x.region ? Regions[x.region].nom : null };
      }),
    });
  }, [groups]);

  return (
    <MaterialTable
      title=""
      localization={{
        toolbar: {
          searchPlaceholder: "Chercher",
        },
        body: {
          deleteTooltip: "Supprimer",
          editTooltip: "Modifier",
          addTooltip: "Nouveau",
        },
      }}
      options={{
        pageSize: 10,
        exportButton: true,
        exportAllData: true,
      }}
      columns={state?.columns}
      data={state?.data}
      onRowClick={(event, rowData) =>
        canSee && navigate("/app/groupe/" + rowData._id)
      }
    />
  );
};

export default GroupTable;
