import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby"
import { Breadcrumbs, Button, Card, List, ListItem, Typography, ListItemIcon } from "@material-ui/core";
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';

const FormationResume = ({niveau, branche}) => {

    const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/formation/"}}
        ) {
            edges {
              node {
                frontmatter {
                  title
                  niveau
                  branche
                }
                html
              }
            }
          }
      }
  `)

    const article = data?.allMarkdownRemark?.edges.filter(x => x?.node?.frontmatter?.niveau.toLowerCase() == niveau.toLowerCase() && x.node.frontmatter.branche.toLowerCase().includes(branche.toLowerCase()))[0]?.node;

    if(!article) {
        return (
            <div>
                Article introuvé
            </div>
        )
    }
    
    const { frontmatter, html } = article;
    
    return (
        <div>        
            <div className="membres-title">
                <Breadcrumbs aria-label="breadcrumb" className="crumbs">
                    <Link color="inherit" to="/app/formation">
                        Formation à distance 2020
                    </Link>
                    <Typography color="textPrimary">{frontmatter.title}</Typography>
                </Breadcrumbs>
            </div>
            <div className="formation-main-container"> 
                <div className="formation-disponibles">
                    <Card className={`formation-card preformatted ${branche}`}>
                        <b>Cahier du participant</b>
                        <List>
                            <ListItem disabled divider button disableRipple>
                                <ListItemIcon>
                                    <LibraryBooksRoundedIcon />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Card>
                </div>
                <div className="formation-main-message">
                    <Card className={`formation-card preformatted ${branche}`}>
                        <blockquote style={{lineHeight: "2rem"}} dangerouslySetInnerHTML={{ __html: html }} />
                        <div>
                        <Button variant="outlined" color="primary" target="_blank" href="https://forms.gle/Qn7mP9VBKoDYGbCMA" >Inscription</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FormationResume;