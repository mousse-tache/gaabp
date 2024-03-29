import { List, ListItem } from "@material-ui/core";
import { Link } from "gatsby";
import { useEffect, useState } from "react";

import useAuthUser from "@aabp/auth/useAuthUser";
import GroupClient from "@aabp/clients/groupClient";
import UnitClient from "@aabp/clients/unitClient";

const QuickUnits = (): React.ReactNode => {
  const authedUser = useAuthUser();
  const [unitList, setUnitList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const groupClient = new GroupClient();
  const unitClient = new UnitClient();

  const ownUnits = authedUser?.nominations
    ? authedUser.nominations
        .filter((x) => !x.ed)
        .map((x) => x.unitId)
        .filter((x) => x)
    : [];
  const ownGroups = authedUser?.nominations
    ? authedUser.nominations.map((x) => x.groupId).filter((x) => x)
    : [];

  useEffect(() => {
    FetchUnits();
    FetchGroups();
  }, [authedUser]);

  async function FetchUnits() {
    if (ownUnits.length == 0) {
      return;
    }

    try {
      const data = await unitClient.getMultipleById(ownUnits);
      if (data !== null) {
        setUnitList(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function FetchGroups() {
    if (ownGroups.length == 0) {
      return;
    }

    try {
      const data = await groupClient.getMultipleById(ownGroups);
      if (data !== null) {
        setGroupList(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  if (ownUnits.length === 0 && ownGroups.length === 0) {
    return <List />;
  }

  return (
    <List>
      <ListItem className="title-list-item" disableGutters divider>
        Mes unités
      </ListItem>
      {unitList.map((unit) => (
        <ListItem key={unit._id} dense>
          <Link className="quick-units" to={"/app/unite/" + unit._id}>
            {unit.nom}
          </Link>
        </ListItem>
      ))}
      {groupList.map((group) => (
        <ListItem key={group._id} dense>
          <Link className="quick-units" to={"/app/groupe/" + group._id}>
            {"Groupe " + group.numero + " " + group.nom}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default QuickUnits;
