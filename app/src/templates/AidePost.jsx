import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "@material-ui/core";

import Layout from "@aabp/components/public-components/Layout";

import "./aide-post.scss";

export default function AidePost({ data }) {
    const post = data?.markdownRemark;

    return (
      <Layout>
        <Helmet>
            <meta name="description" content={`Centre d'aide de l'Association des aventurier de baden-powell | ${post.frontmatter.title}`}/>
            <meta name="keywords" content="scout, scoutisme, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association, aide, help"></meta>
            <title>AABP | {post.frontmatter.title}</title>
            <html lang="fr" />
        </Helmet>
        <section className="wrapper aide-post">
          <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" to="/aide">
                Centre d'aide
            </Link>
            <div>{post.frontmatter.title}</div>
          </Breadcrumbs>                    
          <div>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </section>
      </Layout>
    );
  }

  export const query = graphql`
    query($slug: String!) {
      markdownRemark(frontmatter: { path: { eq: $slug } }) {
        frontmatter {
          title
        }
        html
      }
    }`;