import React from "react";
import { List, ListItem } from "@material-ui/core";
import { useStaticQuery } from "gatsby";

const Documents = () => {
    const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/docs/"}}
        ) {
            edges {
              node {
                frontmatter {
                  title
                  file
                }
                html
              }
            }
          }
      }
  `);

    const docs = data?.allMarkdownRemark?.edges;
    console.log(docs);

    return (
        <List>
            {docs && docs.map(
                (x, i) => {
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

export default Documents;