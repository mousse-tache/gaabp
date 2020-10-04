import React, { useContext } from "react"
import Loading from "../loading/loading"
import { Card, List, ListItem, Button, ListItemIcon } from '@material-ui/core';
import UserContext from "../../context/userContext";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import "./formation.css";
import { navigate } from "gatsby";

const Formation = () => {
    const authedUser = useContext(UserContext).authedUser;
    
    if(authedUser?._id == undefined) {
        return <Loading />;
    }

    return  (
    <div>        
        <div className="membres-title">
            <div className="membres-title-element"><h3>Formation à distance 2020</h3></div>
        </div>
        <div className="formation-main-container" container spacing={3} > 
            <div className="formation-disponibles">
                <Card className="formation-card preformatted">
                    <b>Formations disponibles</b>
                    <List>
                        <ListItem divider button disableRipple onClick={() => navigate("/app/formation/BC0/multibranche")}>
                            <ListItemIcon>
                                <BookmarkIcon style={{color: "grey"}} />    
                            </ListItemIcon>
                            <p>
                            {"BC0 – Nouveau chef \n"} 
                            <i>Inscription obligatoire</i>   
                            </p>     
                        </ListItem>
                        <ListItem divider button disableRipple onClick={() => navigate("/app/formation/BC1/bleu")}>
                            <ListItemIcon>
                                <BookmarkIcon style={{color: "blue"}} />   
                            </ListItemIcon>
                            <p>
                            {"BC1 - Bleu \n"}
                            <i>Inscription obligatoire</i>   
                            </p>          
                        </ListItem>
                        <ListItem divider button disableRipple onClick={() => navigate("/app/formation/BC1/jaune")}>
                            <ListItemIcon>
                                <BookmarkIcon color="secondary" />   
                            </ListItemIcon>
                            <p>
                            {"BC1 - Jaune \n"}
                            <i>Inscription obligatoire</i>   
                            </p>          
                        </ListItem>
                        <ListItem divider button disableRipple onClick={() => navigate("/app/formation/FR0/rouge")}>
                            <ListItemIcon>
                                <BookmarkIcon color="primary" />   
                            </ListItemIcon>   
                            <p>
                            {"FR0 - Rouge \n"}
                            <i>Formation destinée aux membres</i>   
                            </p>         
                        </ListItem>
                        <ListItem divider button disableRipple onClick={() => navigate("/app/formation/coeducation/multibranche")}>
                            <ListItemIcon>
                                <BookmarkIcon style={{color: "grey"}} />   
                            </ListItemIcon> 
                            <p>
                            {"La Coéducation \n"}
                            <i>{"Formation destiné aux unités en co-éducation \n Inscription obligatoire"}</i>   
                            </p>            
                        </ListItem>
                    </List>
                </Card>
            </div>
            <div className="formation-main-message">
                <Card className="formation-card preformatted">
                    <blockquote style={{lineHeight: "2rem"}}>
                        {"Bonjour à tous\, \n \n Cette année hors du commun nous aura permis de surmonter un nouveau défi à la formation; Un programme à distance fonctionnel sans avoir à faire de concessions sur notre programme de formation initial. \n Un travail colossal a été accompli et les formateurs n’attendent que des participants pour partager avec dynamisme leur savoir. \n Les formateurs communiqueront avec TOUS les participants avant le début de la formation pour revoir le cahier du participant avec eux et s'assurer de la compréhension de tous. \n \n Marianne De Garie \n Commissaire à la formation"}
                    </blockquote>
                    <div>
                    <Button variant="outlined" color="primary" target="_blank" href="https://forms.gle/Qn7mP9VBKoDYGbCMA" >Inscription</Button>
                    </div>
                </Card>
            </div>
            <div>
                <iframe width="560" height="315" src="https://youtube.com/embed/n4YAV1MThtI" frameBorder="0" allowFullScreen></iframe>
            </div>
        </div>
    </div>
    )
}

export default Formation
