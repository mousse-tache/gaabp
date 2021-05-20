import React from "react";
import { List, ListItem } from "@material-ui/core";

import Convocation from "@aabp/docs/aga2021/00 Convocation.pdf";
import ODJ from "@aabp/docs/aga2021/04 - Ordre du jour.pdf";
import PV from "@aabp/docs/aga2021/05 - Procès verbal AGA 2020.pdf";
import EtatsFinanciers from "@aabp/docs/aga2021/07 - État Financier Préliminaire.pdf";
import Cotisation from "@aabp/docs/aga2021/8.1 AGA - Résolution cotisation.pdf";
import Budget from "@aabp/docs/aga2021/08 - Budget AABP 2020-21.pdf";
import ReglementGeneraux from "@aabp/docs/aga2021/10.1 - Modification aux règlements généraux - cor.pdf";
import Deonto from "@aabp/docs/aga2021/10.2 - Règlement spécifique xx - Ethique et déontologie.pdf";
import Uniforme from "@aabp/docs/aga2021/10.3 - Uniforme.pdf";
import ChefGroup from "@aabp/docs/aga2021/10.4 - Rôle chef de groupe.pdf";

const AGA2021 = () => {
    return (
        <List>
            <ListItem>
                <a href={Convocation} target="_blank" rel="noopener noreferrer">00 Convocation.pdf</a>
            </ListItem>
            <ListItem>
                <a href={ODJ} target="_blank" rel="noopener noreferrer">04 - Ordre du jour.pdf</a>
            </ListItem>
            <ListItem>
                <a href={PV} target="_blank" rel="noopener noreferrer">05 - Procès verbal AGA 2020.pdf</a>
            </ListItem>
            <ListItem>
                <a href={EtatsFinanciers} target="_blank" rel="noopener noreferrer">07 - État Financier Préliminaire.pdf</a>
            </ListItem>
            <ListItem>
                <a href={Cotisation} target="_blank" rel="noopener noreferrer">8.1 AGA - Résolution cotisation.pdf</a>
            </ListItem>
            <ListItem>
                <a href={Budget} target="_blank" rel="noopener noreferrer">08 - Budget AABP 2020-21.pdf</a>
            </ListItem>
            <ListItem>
                <a href={ReglementGeneraux} target="_blank" rel="noopener noreferrer">10.1 - Modification aux règlements généraux - cor.pdf</a>
            </ListItem>
            <ListItem>
                <a href={Deonto} target="_blank" rel="noopener noreferrer">10.2 - Règlement spécifique xx - Ethique et déontologie.pdf</a>
            </ListItem>
            <ListItem>
                <a href={Uniforme} target="_blank" rel="noopener noreferrer">10.3 - Uniforme.pdf</a>
            </ListItem>
            <ListItem>
                <a href={ChefGroup} target="_blank" rel="noopener noreferrer">10.4 - Rôle chef de groupe.pdf</a>
            </ListItem>
        </List>
    );
};

export default AGA2021;