import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/public-components/layout"

export default function BlogPost({ data }) {
    const post = data?.markdownRemark
    return (
      <Layout>
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