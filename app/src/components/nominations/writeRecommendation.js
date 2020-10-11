import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext";

import { useSnackbar } from 'notistack';
import NominationClient from "../../clients/nominationClient";

const WriteRecommendation = () => {
    const { authedUser } = useContext(UserContext);
    const [nominations, setNominations] = useState([]);
    const { enqueueSnackbar } = useSnackbar;
    const nominationClient = new NominationClient();

    const FetchNominations = async() => {
        try {
            const demandesNomination = await nominationClient.getPendingRecommendationForUser(authedUser._id);
            setNominations(demandesNomination);
        } catch (error) {
            enqueueSnackbar(error.toString());
        }
    };

    return (
        <div>
            Patate pouél
        </div>
    )
};

export default WriteRecommendation;