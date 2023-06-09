import CardContent from "@material-ui/core/CardContent";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

import AppContext from "@aabp/context/app/appContext";
import UserContext from "@aabp/context/userContext";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import UserClient from "@aabp/clients/userClient";

const FormationMembre = () => {
  const { authedUser } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const { member, setMember, saveUser } = useContext(UserContext);
  const formations = member?.formations;
  formations.sort();

  const userClient = new UserClient();
  const [formateurs, setFormateurs] = useState();
  const [shouldSave, setShouldSave] = useState(false);

  // https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
  Array.prototype.unique = function () {
    const a = this.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  };

  const FetchFormateurs = async () => {
    try {
      let ids = formations.map((x) => x.recommendedBy);
      ids = ids.concat(formations.map((x) => x.confirmedBy)).unique();
      if (ids.length < 1) {
        return;
      }

      const formateurArray = [];
      const reducedFormateurs = {};
      const data = await userClient.getByIds(ids);

      data.forEach((formateur) => {
        if (formateurArray.filter((x) => x._id === formateur._id).length < 1) {
          formateurArray.push(formateur);
          const id = formateur._id;
          const nom = `${formateur.prenom} ${formateur.nom}`;
          reducedFormateurs[id] = nom;
        }
      });

      setFormateurs(reducedFormateurs);
    } catch (e) {
      console.log(e);
    }
  };

  const SetAndSave = async (newMember) => {
    await setMember(newMember);
    await setShouldSave(true);
  };

  useEffect(() => {
    if (!formateurs) {
      FetchFormateurs();
    }
  }, [formations]);

  useEffect(() => {
    if (shouldSave) {
      saveUser();
      setShouldSave(false);
    }
  }, [shouldSave]);

  return (
    <CardContent>
      <MaterialTable
        title=""
        columns={[
          { title: "Niveau", field: "niveau.name", editable: false },
          { title: "Branche", field: "branche.couleur", editable: false },
          { title: "Émis le", field: "dateConfirme" },
          {
            title: "Émis par",
            field: "confirmedBy",
            lookup: formateurs,
            editable: false,
          },
          { title: "Recommandé le", field: "dateRecommende" },
          {
            title: "Recommander par",
            field: "recommendedBy",
            lookup: formateurs,
            editable: false,
          },
        ]}
        data={formations}
        options={{
          pageSize: 10,
          search: true,
          grouping: true,
          exportButton: true,
        }}
        editable={{
          isEditable: () =>
            Permissions(PermissionTypes.ConfirmFormation, authedUser),
          isEditHidden: () =>
            !Permissions(PermissionTypes.ConfirmFormation, authedUser),
          isDeletable: () =>
            Permissions(PermissionTypes.ConfirmFormation, authedUser),
          isDeleteHidden: () =>
            !Permissions(PermissionTypes.ConfirmFormation, authedUser),
          onRowDelete: (newData) =>
            new Promise((resolve) => {
              setTimeout(async () => {
                const formations = member?.formations.filter(
                  (x) => x.tableData.id !== newData.tableData.id,
                );
                await SetAndSave({ ...member, formations: formations });
                resolve();
              }, 1000);
            }),
          onRowUpdateCancelled: () =>
            enqueueSnackbar("Aucune modification apportée"),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(async () => {
                const index = oldData.tableData.id;
                const formations = member?.formations;
                formations[index] = newData;
                formations[index].approvedBy = authedUser._id;
                await SetAndSave({ ...member, formations: formations });
                resolve();
              }, 1000);
            }),
        }}
      />
    </CardContent>
  );
};

FormationMembre.propTypes = {
  formations: PropTypes.array,
};

export default FormationMembre;
