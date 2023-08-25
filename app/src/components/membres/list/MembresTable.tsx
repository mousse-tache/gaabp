import UserClient from "@aabp/clients/userClient";
import { CsvBuilder } from "filefy";
import { navigate } from "gatsby";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import Proptypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import BadgeMapper from "@aabp/components/membres/formation/BadgeMapper";
import MembreListHeader from "./MembreListHeader";

import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@material-ui/icons/ToggleOnOutlined";

import getAnneeDeService from "@aabp/utils/anneeService";

const MembresTable = ({ canEdit }, { canEdit: boolean }): React.ReactNode => {
  const [activeOnly, setActiveOnly] = useState(true);
  const [init, setInit] = useState(false);
  const tableRef = useRef();
  const columns = [
    { title: "", field: "nom", filtering: false },
    { title: "Courriel", field: "courriel", filtering: false },
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
          {row.formations && row.formations.map((x, i) => {
            return (
              <BadgeMapper
                key={i}
                badgeId={x.niveau.id}
                branche={x.branche.couleur}
              />
            );
          })}
        </div>
      ),
      filtering: false,
    },
    { title: "Années de service", field: "service", width: "10%" },
    {
      title: "Statut",
      field: "statut",
      lookup: { 0: "Inactif", 1: "Actif" },
      filtering: true,
      tooltip: "Un membre est actif s'il a au moins une nomination courante",
      width: "1rem",
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const userClient = new UserClient();

  async function FetchUsers(page, pageSize, query, status) {
    try {
      const data = await userClient.getPagedUsers(page, pageSize, query, status);
      return data;
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }

  const exportCsv = async () => {
    const allData = await userClient.getEmailContact();

    const exportedData = allData.map((rowData) =>
      columns.map((columnDef) => rowData[columnDef.field]),
    );
    new CsvBuilder("membres")
      .setDelimeter(";")
      .setColumns(columns.map((columnDef) => columnDef.title))
      .addRows(exportedData)
      .exportFile();
  };

  useEffect(() => {
    if (init) {
      tableRef.current.onQueryChange();
    } else {
      setInit(true);
    }
  }, [activeOnly]);

  return (
    <MaterialTable
      tableRef={tableRef}
      title={<MembreListHeader />}
      localization={{
        toolbar: {
          searchPlaceholder: "Chercher",
          exportCSVName: "Exporter les contacts",
        },
      }}
      options={{
        pageSize: 10,
        exportButton: canEdit,
        exportCsv: exportCsv,
        exportFileName: "membres",
        exportAllData: true,
        tableLayout: "fixed",
        sorting: false
      }}
      data={(query) =>
        new Promise(async (resolve) => {
          const { users, count, page } = await FetchUsers(
            query.page + 1,
            query.pageSize,
            query.search,
            activeOnly,
          );
          const filteredUsers = [];
          if (users && users.length > 0) {
            users.forEach((x) => {
              filteredUsers.push({
                _id: x._id,
                courriel: x.courriel,
                nom: `${x.prenom} ${x.nom}`,
                statut:
                  x?.nominations &&
                  x.nominations.filter((x) => !x.ed).length > 0
                    ? 1
                    : 0,
                formations:
                  x?.formations &&
                  x.formations.filter((x) => Boolean(x.dateConfirme)),
                service: getAnneeDeService(x.nominations),
              });
            });
          }
          resolve({
            data: filteredUsers,
            page: page - 1,
            totalCount: count,
          });
        })
      }
      actions={[
        {
          icon: activeOnly ? ToggleOnOutlinedIcon : ToggleOffOutlinedIcon,
          tooltip: "Filtrer les inactifs",
          isFreeAction: true,
          onClick: () => setActiveOnly(!activeOnly),
        },
      ]}
      columns={columns}
      onRowClick={(event, rowData) =>
        canEdit ? navigate("/app/membre/" + rowData._id) : null
      }
    />
  );
};

MembresTable.propTypes = {
  canEdit: Proptypes.bool,
};

export default MembresTable;
