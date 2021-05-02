import React, { useEffect, useState } from "react";
import BC1 from "@aabp/images/BC1.png";
import BC2 from "@aabp/images/BC2.png";
import BC3 from "@aabp/images/BC3.png";

import BaseBadge, { BadgeStyles } from "@aabp/components/badge/BaseBadge";

import "./badge-competence.scss";

const BadgeBrevetCompetence = ({formation}) => {
    const [badge, setBadge] = useState(false);
    const [badgeClass, setBadgeClass] = useState("");

    useEffect(() => {
        setBadgeClass(formation);
        switch(formation) {
            case "bc1":
                setBadge(BC1);
                break;
            case "bc2":
                setBadge(BC2);
                break;
            case "bc3":
                setBadge(BC3);
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
        <BaseBadge style={BadgeStyles.Rounded} className={`badge-brevet--${badgeClass}`}>
            <img src={badge} aria-label={`badge-de-competence`} />
        </BaseBadge>
    );
};

export default BadgeBrevetCompetence;