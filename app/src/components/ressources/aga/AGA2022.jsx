import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { List, ListItem } from "@material-ui/core";

//import ODJ from "@aabp/docs/aga2022/4 - ODJ AGA 2022.docx";
// import PV from "@aabp/docs/aga2022/05 - Procès verbal AGA 2020.pdf";
// import EtatsFinanciers from "@aabp/docs/aga2022/07 - État Financier Préliminaire.pdf";
// import Cotisation from "@aabp/docs/aga2022/8.1 AGA - Résolution cotisation.pdf";
// import Budget from "@aabp/docs/aga2022/08 - Budget AABP 2020-21.pdf";
// import ReglementGeneraux from "@aabp/docs/aga2022/10.1 - Modification aux règlements généraux - cor.pdf";
// import Deonto from "@aabp/docs/aga2022/10.2 - Règlement spécifique xx - Ethique et déontologie.pdf";
// import Uniforme from "@aabp/docs/aga2022/10.3 - Uniforme.pdf";
// import ChefGroup from "@aabp/docs/aga2022/10.4 - Rôle chef de groupe.pdf";

const AGA2022 = () => {
    const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/docs/"}}
        ) {
            edges {
              node {
                frontmatter {
                  title
                  path
                  file
                }
                html
              }
            }
          }
      }
  `);

    const docs = data?.allMarkdownRemark?.edges;

    return (
        <List>
            {docs && docs.map(
                (x, i) => {
                    if(!x.node.frontmatter.path.includes("aga2022")) {
                      return null;
                    }

                    return (
                        <ListItem key={i}
                        button 
                        component="a" 
                        rel="noopener noreferrer" 
                        target="_blank"
                        href={x.node.frontmatter.file}>
                            {x.node.frontmatter.title}
                        </ListItem>
                    );
                }
            )}
        </List>        
    );
};

export default AGA2022;
