import React, { useEffect, useState } from "react";
import BadgeBrevetCompetence from "./BadgeBrevetCompetence";
import BadgeFormateur from "./BadgeFormateur";

import "./member-formation-uniform.scss";

const MemberFormationsUniform = ({formations}) => {
    const [filteredFormations, setFilteredFormations] = useState({});

    useEffect(() => {
        setFilteredFormations({
            "bc1": formations.filter(x => x.niveau?.id === "1" || x.niveau?.id === "7" ).length > 0,
            "bc2": formations.filter(x => x.niveau?.id === "2" || x.niveau?.id === "8" ).length > 0,
            "bc3": formations.filter(x => x.niveau?.id === "3" || x.niveau?.id === "9" ).length > 0,
            "formateurApprenti": formations.filter(x => x.niveau?.id === "30" || x.niveau?.id === "32" || x.niveau?.id === "34" ).length > 0,
            "formateurBrevete": formations.filter(x => x.niveau?.id === "30" || x.niveau?.id === "32" ).length > 0,
            "formateurConseiller": formations.filter(x => x.niveau?.id === "34" ).length > 0,
        });
    }, [formations]);

    return (
        <div className="member-formation-uniform">
            <BadgeBrevetCompetence filteredFormations={filteredFormations} />
            <BadgeFormateur filteredFormations={filteredFormations} />
        </div>
    )
};

MemberFormationsUniform.defaultProps = {
    formations: []
};

export default MemberFormationsUniform;