import React, { useEffect, useState } from "react";

import BaseBadge, {BadgeStyles} from "@aabp/components/badge/BaseBadge";

import Buchettes from "@aabp/images/buchettes.png";
import BadgeBrevetCompetence from "./BadgeBrevetCompetence";

import "./badge-mapper.scss";

const BadgeMapper = ({badgeId, branche, ...props}) => {
    const [badge, setBadge] = useState();

    useEffect(() => {

        switch(badgeId) {
            //CEP 1, BC1
            case "1":
            case "7":
                setBadge(<BadgeBrevetCompetence formation="bc1" />);
                break;
            //CEP 2, BC2
            case "2":
            case "8":
                setBadge(<BadgeBrevetCompetence formation="bc2" />);
                break;
            //CEP 3, BC3
            case "3":
            case "9":
                setBadge(<BadgeBrevetCompetence formation="bc3" />);
                break; 
            case "4":
                setBadge(
                    <BaseBadge style={BadgeStyles.Squared} className="buchettes">
                        <img src={Buchettes} aria-label={`badge-de-competence`} />
                    </BaseBadge>
                );
                break;           
            default:
                setBadge(null);
                break;
        }
    }, [badgeId]);

    if(!badge) {
        return null;
    }

    return (
        <div {...props} className={`badge-mapper`}>
            <div className={`badge-contour--${branche.toLowerCase()}`}>
                {badge}
            </div>
        </div>
    );
};

export default BadgeMapper;