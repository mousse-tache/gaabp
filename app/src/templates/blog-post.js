import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/public-components/layout"
import { Helmet } from "react-helmet"

export default function BlogPost({ data }) {
    const post = data?.markdownRemark
    return (
      <Layout>
        <Helmet>
            <meta name="description" content={`Blog de l'Association des aventurier de baden-powell | ${post.frontmatter.title}`}/>
            <meta name="keywords" content="scout, scoutisme, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association, blog"></meta>
            <title>AABP | {post.frontmatter.title}</title>
            <html lang="fr" />
        </Helmet>
        <section className="wrapper">
          <h1>{post.frontmatter.title}</h1>
          <div>
              <div className="full-bleed" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </section>
      </Layout>
    )
  }
  export const query = graphql`
    query($slug: String!) {
      markdownRemark(frontmatter: { path: { eq: $slug } }) {
        frontmatter {
          title
        }
        html
      }
    }`