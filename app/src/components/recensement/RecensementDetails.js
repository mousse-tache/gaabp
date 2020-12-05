import React, { useContext } from 'react'
import Loading from '../loading/loading'
import { AccordionDetails, Grid, Typography, Divider, List, ListItem } from '@material-ui/core'
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import { navigate } from 'gatsby';
import RecensementContext from '../../context/recensementContext';

const RecensementDetails = () => {
    const { recensement, users, usersNonRecenses } = useContext(RecensementContext);
    var details = recensement?.details?.cost?.details;

    if(!recensement) {
        return <Loading />
    }

    return (        
        <AccordionDetails>
            <Grid container spacing={3} className="recensement-detail-container" >            
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Dernier recensement
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <b>Année:</b> {new Date(recensement.date).getFullYear()}
                </Grid>
                <Grid item xs={3}>
                    <b>Nombre de membres:</b> {recensement.details.unitMembers.length}
                </Grid>
                <Grid item xs={3}>
                    <b>Coût total:</b> {recensement.cost},00$
                </Grid>           
                <Grid item xs={3}>
                    <b style={recensement.paiementComplet ? {} : {color:"red"}} >Paiement complété:</b> {recensement.paiementComplet ? 
                    (<span>Oui <CheckIcon color="primary" /></span>) :   (<span>Non <BlockIcon color="primary" /></span>) }
                </Grid>          
                <Grid item xs={12}>
                    <Divider />   
                </Grid>                             
                <Grid item xs={3}>
                    Type
                </Grid>                                  
                <Grid item xs={3}>
                    Nombre
                </Grid>                                  
                <Grid item xs={3}>
                    Coût unitaire
                </Grid>                                  
                <Grid item xs={3}>
                    Coût total
                </Grid>             
                <Grid item xs={12}>
                    <Divider />   
                </Grid>                             
                <Grid item xs={3}>
                    Adultes formés
                </Grid>                                  
                <Grid item xs={3}>
                    {details.formedUsers}
                </Grid>                                  
                <Grid item xs={3}>
                    1
                </Grid>                                  
                <Grid item xs={3}>                
                    {details.formedUsers}
                </Grid>             
                <Grid item xs={12}>
                    <Divider />   
                </Grid>                             
                <Grid item xs={3}>
                    Membres de maîtrise non formés
                </Grid>                                  
                <Grid item xs={3}>
                    {details.adultUsers}
                </Grid>                                  
                <Grid item xs={3}>
                    25
                </Grid>                                  
                <Grid item xs={3}>                
                    {details.adultUsers * 25}
                </Grid>
                <Grid item xs={12}>
                    <Divider />   
                </Grid>                             
                <Grid item xs={3}>
                    Membres non titulaires
                </Grid>                                  
                <Grid item xs={3}>
                    {details.others}
                </Grid>                                  
                <Grid item xs={3}>                
                    {recensement.details.cost.basePrice}
                </Grid>                                  
                <Grid item xs={3}>                
                    {details.others * recensement.details.cost.basePrice}
                </Grid>
                <Grid item xs={12}>
                    <Divider />   
                </Grid>  
                <Grid item xs={6}>
                    
                    <List>
                        <ListItem>
                            <b>Membres inclus dans le dernier recensement</b>
                        </ListItem>
                        {users && users.map(x => <ListItem button onClick={() => navigate("/app/membre/"+x._id)}>{x.prenom} {x.nom}</ListItem>)}
                    </List>  
                </Grid>    
                <Grid item xs={6}>
                    
                    <List>
                        <ListItem>
                            <b>Membres non inclus dans le dernier recensement</b>
                        </ListItem>
                        {usersNonRecenses && usersNonRecenses.map(x => <ListItem button onClick={() => navigate("/app/membre/"+x._id)}>{x.prenom} {x.nom}</ListItem>)}
                    </List>  
                </Grid>       
            </Grid>
        </AccordionDetails>
    )
}

export default RecensementDetails