import React from "react"
import Layout from "../../components/public-components/layout"
import { graphql, useStaticQuery } from "gatsby"
import BlogCard from "../../components/blog/blogCard"
import { Helmet } from "react-helmet"

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

    return (
    <Layout>
      <Helmet>
          <meta name="description" content="Blog de l'Association des aventuriers de Baden-Powell"/>
          <meta name="keywords" content="scout, scoutisme, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association, blog"></meta>
          <title>AABP | Blog sur le scoutisme traditionnel</title>
          <html lang="fr" />
      </Helmet>
        <h1>Blog</h1>
        <div className="wrapper" >
          {articles.map(x => <BlogCard article={x.node?.frontmatter} />)}
        </div>
    </Layout>
    )
}

export default NotFoundPage
