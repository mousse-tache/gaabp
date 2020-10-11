import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import { Input, Button } from "@material-ui/core";
import UserContext from "../../../context/userContext";
import NominationClient from "../../../clients/nominationClient";
import { useSnackbar } from "notistack";

const NominationRecommendation = ({approver, index, complete, nomination}) => {
    const { authedUser } = useContext(UserContext);
    const [recommandation, setRecommandation] = useState(approver.recommandation ?? "");
    const nominationClient = new NominationClient();
    var { enqueueSnackbar } = useSnackbar();

    const saveRecommendation = () => {
        try {
            var newApprovers = [...nomination.approvers];
            newApprovers[index].recommandation = recommandation;
            var updatedNomination = {...nomination, approvers: newApprovers} ;
            nominationClient.updateDemandeNomination(updatedNomination);

            enqueueSnackbar("Votre recommendation a été sauvgardée");
        } catch (error) {
            enqueueSnackbar(error);
        }
    };

    return (
        <div style={{display:"flex", flexDirection:"column", padding:"1rem"}} >
            <Link to={`/app/membre/${approver._id}`}>
                {approver.nom}
            </Link>
            <Input multiline disabled={complete || authedUser._id != approver._id} value={recommandation} onChange={(e) => setRecommandation(e.target.value)} />
            {!complete && authedUser._id == approver._id && 
            (
                <div>
                    <Button onClick={saveRecommendation}>
                        Sauvegarder
                    </Button>
                </div>
            )
            }
        </div>
    )
};

export default NominationRecommendation;