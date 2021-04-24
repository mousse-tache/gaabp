import React, { useContext } from "react";
import { Button } from "@material-ui/core";

import NominationContext from "@aabp/context/nominationContext";

const FinalStep = () => {
    const { nomination, setNomination } = useContext(NominationContext);


    return (
        <div className="step-main-container">
            <h2>
                Merci de votre implication
            </h2>
            <p className="nomination-flex-container">
                Votre demande de nomination a été soumise. Les gens que vous avez indiqué comme référence seront contactés.
            </p>

            <div className="nomination-flex-container">
                <Button variant="contained" color="primary" onClick={() => setNomination({...nomination, done:true})}>
                    Retour à l'application
                </Button>
            </div>
        </div>
    )
};

export default FinalStep;