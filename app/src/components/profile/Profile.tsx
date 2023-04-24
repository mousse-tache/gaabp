import { useContext, useEffect, useState } from "react";

import { navigate } from "gatsby";
import { useSnackbar } from "notistack";

import { Alert, Skeleton } from "@material-ui/lab";

import AppContext from "@aabp/context/app/appContext";
import UserContext from "@aabp/context/userContext";

import UserClient from "@aabp/clients/userClient";

import Card from "@aabp/components/design-system/Card/Card";
import MemberDetails from "@aabp/components/membres/MemberDetails";
import UserDetailsTab from "@aabp/components/membres/UserDetailsTabs";

const Profile = (): React.ReactNode => {
  const { authedUser, claims, init } = useContext(AppContext);
  const [member, setMember] = useState({});

  const userClient = new UserClient();
  const { enqueueSnackbar } = useSnackbar();

  async function AddUser() {
    try {
      await userClient.completeSignup(member);
      enqueueSnackbar(
        `${member?.prenom} ${member?.nom}, votre inscription a été complétée`,
        { variant: "success" },
      );
      navigate("/app/profile");
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }

  async function saveUser() {
    try {
      if (member?._id) {
        await userClient.updateUser({ ...member, id: member._id });
        enqueueSnackbar(
          `Le profil de ${member?.prenom} ${member?.nom} a été mis à jour.`,
        );
      } else {
        await AddUser();
      }
    } catch (error) {
      enqueueSnackbar(error?.error?.response?.data, { variant: "error" });
    }

    window.location.reload();
  }

  useEffect(() => {
    if (!authedUser) {
      setMember({ ...member, courriel: claims.email });
    } else {
      setMember(authedUser);
    }
  }, [authedUser]);

  if (!init) {
    return <Skeleton />;
  }

  return (
    <UserContext.Provider value={{ member, setMember, saveUser }}>
      <Card className="profile">
        {!authedUser && (
          <Alert severity="warning">
            Complétez votre inscription en remplissant les informations
            suivantes
          </Alert>
        )}
        <MemberDetails isPersonalProfile={true} />
        <UserDetailsTab />
      </Card>
    </UserContext.Provider>
  );
};

export default Profile;
