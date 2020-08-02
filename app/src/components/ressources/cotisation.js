import React from "react";
import { Card, CardContent, List, ListItem } from "@material-ui/core";


const Cotisation = () => {

    return (
        <List>
            <ListItem>
                75$ par membre de moins de 17 ans (donc les jeunes des branches bleue, jaune et verte).                        
            </ListItem>
            <ListItem>
                    25$ par membre de moins de 17 ans (donc les jeunes des branches bleue, jaune et verte)recensé après le 1er avril de l'année suivante.
            </ListItem>
            <ListItem>
                25 $par membre de moins de 17 ans d'une unité en fondation.                        
            </ListItem>
            <ListItem>
                25$ par membre de 17 ans et plus qui n’apas complété au moins un brevet de compétencede niveau 1(B.C.1) OU qui accumule moins d'un an de service.  Le tout en date du 15 septembre de l’année en cours.
            </ListItem>
            <ListItem>
                1$ par membre de 17 ans et plus qui a complété au moins un brevet de compétence de niveau 1 (B.C. 1) ET qui accumule au moins un an de service.  Le tout en date du 15 septembre de l’année en cours 
            </ListItem>
            <ListItem>
                25$ par comité de parents.            
            </ListItem>
        </List>        
    );
};

export default Cotisation;