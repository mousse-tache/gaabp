import React from "react"
import Layout from "../../components/public-components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import BlogCard from "../../components/blog/blogCard"

const NotFoundPage = () => {
    const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/blog/"}}
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
  `)

    const articles = data?.allMarkdownRemark?.edges;
    console.log(articles);

    return (
    <Layout>
        <h1>Blog</h1>
        <div className="wrapper" >
          {articles.map(x => <BlogCard article={x.node?.frontmatter} />)}
        </div>
    </Layout>
    )
}

export default NotFoundPage
