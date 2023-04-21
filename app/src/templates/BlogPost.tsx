import { Breadcrumbs } from "@material-ui/core";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";

import Layout from "@aabp/components/public-components/Layout";
import Default from "@aabp/images/default-blog-image.png";

export default function BlogPost({ data }: { data: unknown }): React.ReactNode {
  const post = data?.markdownRemark;
  const blogImage = post.frontmatter.thumbnail
    ? post.frontmatter.thumbnail
    : Default;

  return (
    <Layout>
      <Helmet>
        <meta
          name="description"
          content={`Blog de l'Association des aventurier de baden-powell | ${post.frontmatter.title}`}
        />
        <meta
          name="keywords"
          content="aventure, aabp, Baden-Powell, aventuriers, jeunes, éclaireurs, louveteaux, activités, association, blog"
        ></meta>
        <title>AABP | {post.frontmatter.title}</title>
        <html lang="fr" />
      </Helmet>
      <section className="wrapper blog-post overflow-hidden">
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
          <Link color="inherit" to="/blog">
            Blog
          </Link>
          <div>{post.frontmatter.title}</div>
        </Breadcrumbs>
        <img
          className="full-bleed m-auto"
          style={{ maxWidth: "800px", borderRadius: "20px" }}
          alt="blog-thumbnail"
          src={blogImage}
        />
        <div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
