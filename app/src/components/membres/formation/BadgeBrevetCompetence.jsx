import React, { useEffect, useState } from "react";
import BC1 from "@aabp/images/BC1.jpg";
//import BC2 from "@aabp/images/BC2.jpg";
import BC3 from "@aabp/images/BC3.jpg";

const BadgeBrevetCompetence = ({filteredFormations}) => {
    const [badge, setBadge] = useState(false);
    const {bc1, bc2, bc3} = filteredFormations;

    useEffect(() => {
        setBadge(bc3 ? BC1 : (bc2? BC1 : (bc1? BC3 : false)));
    }, [filteredFormations]);

    if(!badge) {
        return null;
    }

    return (
        <div className="badge-brevet">
            <img src={badge} aria-label="badge-de-competence" />
        </div>
    );
};

export default BadgeBrevetCompetence;