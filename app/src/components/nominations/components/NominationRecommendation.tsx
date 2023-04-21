import NominationClient from "@aabp/clients/nominationClient";
import AppContext from "@aabp/context/app/appContext";
import { Button, Input } from "@material-ui/core";
import { Link } from "gatsby";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";

const NominationRecommendation = ({
  approver,
  index,
  complete,
  nomination,
}: {
    approver: unknown,
  index: nunber,
  complete: boolean,
  nomination: unknown,
}): React.ReactNode => {
  const { authedUser } = useContext(AppContext);
  const [recommandation, setRecommandation] = useState(
    approver.recommandation ?? "",
  );
  const nominationClient = new NominationClient();
  const { enqueueSnackbar } = useSnackbar();

  const saveRecommendation = () => {
    try {
      const newApprovers = [...nomination.approvers];
      newApprovers[index].recommandation = recommandation;
      const updatedNomination = { ...nomination, approvers: newApprovers };
      nominationClient.updateDemandeNomination(updatedNomination);

      enqueueSnackbar("Votre recommendation a été sauvgardée");
    } catch (error) {
      enqueueSnackbar(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <Link to={`/app/membre/${approver._id}`}>{approver.nom}</Link>
      <Input
        multiline
        disabled={complete || authedUser._id != approver._id}
        value={recommandation}
        onChange={(e) => setRecommandation(e.target.value)}
      />
      {!complete && authedUser._id == approver._id && (
        <div>
          <Button onClick={saveRecommendation}>Sauvegarder</Button>
        </div>
      )}
    </div>
  );
};

export default NominationRecommendation;
