import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";


import Layout from "@aabp/components/public-components/Layout";
import BlogCard from "@aabp/components/blog/blogCard";

const NotFoundPage = () => {
    const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/aide/"}}
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              path
            }
            html
          }
        }
      }
    }
  `);

    const articles = data?.allMarkdownRemark?.edges;

    return (
    <Layout>
      <Helmet>
          <meta name="description" content="Blog de l'Association des aventuriers de Baden-Powell"/>
          <meta name="keywords" content="aventure, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association, blog"></meta>
          <title>AABP | Centre d'aide</title>
          <html lang="fr" />
      </Helmet>
        <h1>Centre d'aide</h1>
        <div className="wrapper" >
          {articles.map((x, index) => <BlogCard key={index} article={x.node?.frontmatter} />)}
        </div>
    </Layout>
    );
};

export default NotFoundPage;
