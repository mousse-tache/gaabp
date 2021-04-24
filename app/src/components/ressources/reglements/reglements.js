import React from "react";
import { List, ListItem } from "@material-ui/core";
import Rules from "@aabp/docs/Règlements généraux.pdf";
import r1 from "@aabp/docs/Réglement spécifique 01 - Ages des chefs et assistants.pdf";
import r2 from "@aabp/docs/Réglement spécifique 02 - Le groupe et sont chef de groupe.pdf";
import r3 from "@aabp/docs/Réglement spécifique 03 - Ages des aides de camps.pdf";
import r4 from "@aabp/docs/Réglement spécifique 04 - Normes de campement.pdf";
import r5 from "@aabp/docs/Réglement spécifique 05 - Normes de campement sous tente.pdf";
import r6 from "@aabp/docs/Règlement spécifique 06 - Uniforme.pdf";
import r7 from "@aabp/docs/Règlement spécifique 07 - Code d'éthique et de déontologie de l'AABP.pdf";
import r8 from "@aabp/docs/Règlement spécifique 08 - Médailles et honneur.pdf";
import r9 from "@aabp/docs/Règlement spécifique 09 - Recensement et cotisations.pdf";
import r10 from "@aabp/docs/Règlement spécifique 10 - Programme d'aide aux nouvelles unités.pdf";
import r11 from "@aabp/docs/Règlement spécifique 11 - Code de procédure.pdf";

const Reglements = () => {
    return (
        <List>
            <ListItem>
                <a href={Rules} target="_blank" rel="noopener noreferrer">Règlements généraux</a>
            </ListItem>
            <ListItem>
                <a href={r1} target="_blank" rel="noopener noreferrer">Réglement spécifique 01 - Ages des chefs et assistants</a>
            </ListItem>
            <ListItem>
                <a href={r2} target="_blank" rel="noopener noreferrer">Réglement spécifique 02 - Le groupe et sont chef de groupe</a>
            </ListItem>
            <ListItem>
                <a href={r3} target="_blank" rel="noopener noreferrer">Réglement spécifique 03 - Ages des aides de camps</a>
            </ListItem>
            <ListItem>
                <a href={r4} target="_blank" rel="noopener noreferrer">Réglement spécifique 04 - Normes de campement</a>
            </ListItem>
            <ListItem>
                <a href={r5} target="_blank" rel="noopener noreferrer">Réglement spécifique 05 - Normes de campement sous tente</a>
            </ListItem>
            <ListItem>
                <a href={r6} target="_blank" rel="noopener noreferrer">Règlement spécifique 06 - Uniforme</a>
            </ListItem>
            <ListItem>
                <a href={r7} target="_blank" rel="noopener noreferrer">Règlement spécifique 07 - Code d'éthique et de déontologie de l'AABP</a>
            </ListItem>
            <ListItem>
                <a href={r8} target="_blank" rel="noopener noreferrer">Règlement spécifique 08 - Médailles et honneur</a>
            </ListItem>
            <ListItem>
                <a href={r9} target="_blank" rel="noopener noreferrer">Règlement spécifique 09 - Recensement et cotisations</a>
            </ListItem>
            <ListItem>
                <a href={r10} target="_blank" rel="noopener noreferrer">Règlement spécifique 10 - Programme d'aide aux nouvelles unités</a>
            </ListItem>
            <ListItem>
                <a href={r11} target="_blank" rel="noopener noreferrer">Règlement spécifique 11 - Code de procédure</a>
            </ListItem>
        </List>
    );
};

export default Reglements;