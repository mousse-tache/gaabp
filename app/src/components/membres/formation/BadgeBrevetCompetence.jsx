import React, { useEffect, useState } from "react";
import BC1 from "@aabp/images/BC1.png";
//import BC2 from "@aabp/images/BC2.jpg";
import BC3 from "@aabp/images/BC3.png";

import BaseBadge, { BadgeStyles } from "@aabp/components/badge/BaseBadge";


const BadgeBrevetCompetence = ({filteredFormations}) => {
    const [badge, setBadge] = useState(false);
    const [badgeClass, setBadgeClass] = useState("");
    const {bc1, bc2, bc3} = filteredFormations;

    useEffect(() => {
        setBadgeClass(bc3 ? "bc3" : (bc2? "bc1" : (bc1? "bc1" : false)));
        setBadge(bc3 ? BC3 : (bc2? BC1 : (bc1? BC1 : false)));
    }, [filteredFormations]);

    if(!badge) {
        return null;
    }

    return (
        <BaseBadge style={BadgeStyles.Rounded} className={`badge-brevet--${badgeClass}`}>
            <img src={badge} aria-label={`badge-de-competence`} />
        </BaseBadge>
    );
};

export default BadgeBrevetCompetence;