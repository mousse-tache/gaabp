import React, { useEffect, useState } from "react";
import Apprenti from "@aabp/images/formateur-apprenti.png";
import Brevete from "@aabp/images/formateur-brevete.png";
import Conseiller from "@aabp/images/formateur-conseiller.png";

import "./badge-formateur.scss";

const BadgeFormateur = ({formation}) => {
    const [badge, setBadge] = useState(false);

    useEffect(() => {   
        switch(formation) {
            case "apprenti":
                setBadge(Apprenti);
                break;
            case "brevete":
                setBadge(Brevete);
                break;
            case "conseiller":
                setBadge(Conseiller);
                break;
            default:
                setBadge(null);
                break;

        }
    }, [formation]);

    if(!badge) {
        return null;
    }

    return (
        <div className="badge-formateur">
            {badge && <img src={badge} aria-label="badge-de-formateur" />}
        </div>
    );
}; 

export default BadgeFormateur;