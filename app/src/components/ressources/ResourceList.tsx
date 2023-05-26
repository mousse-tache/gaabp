import { List, ListItem } from "@material-ui/core";
import { graphql, useStaticQuery } from "gatsby";

const ResourceList = ({ path }: { path: string }): React.ReactNode => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/docs/" } }) {
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
      {docs &&
        docs.map((x, i) => {
          if (!x.node.frontmatter.path.includes(path)) {
            return null;
          }

          return (
            <ListItem
              key={i}
              button
              component="a"
              rel="noopener noreferrer"
              target="_blank"
              href={x.node.frontmatter.file}
            >
              {x.node.frontmatter.title}
            </ListItem>
          );
        })}
    </List>
  );
};

export default ResourceList;
