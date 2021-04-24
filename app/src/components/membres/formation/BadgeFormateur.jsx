import React, { useEffect, useState } from "react";
import Apprenti from "@aabp/images/formateur-apprenti.png";
import Brevete from "@aabp/images/formateur-brevete.png";
import Conseiller from "@aabp/images/formateur-conseiller.png";

const BadgeFormateur = ({filteredFormations}) => {
    const [badge, setBadge] = useState(false);

    useEffect(() => {
        setBadge(filteredFormations?.formateurConseiller ? Conseiller : (filteredFormations?.formateurBrevete? Brevete : (filteredFormations?.formateurApprenti ? Apprenti : false)));
    }, [filteredFormations]);

    return (
        <div className="badge-formateur">
            {badge && <img src={badge} aria-label="badge-de-formateur" />}
        </div>
    );
}; 

export default BadgeFormateur;