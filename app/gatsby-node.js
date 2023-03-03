const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require("fs-extra");

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // Only update the `/app` page.
  if (page.path.match(/^\/app/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/app/*";
    // Update the page.
    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    // Exclude Okta from compilation path
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /okta-auth/,
            use: loaders.null(),
          },
          {
            test: /okta-signin-widget/,
            use: loaders.null(),
          },
          {
            test: /okta-react/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@aabp": path.resolve(__dirname, "src"),
      },
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    const aide = createFilePath({ node, getNode, basePath: `aide` });
    createNodeField({
      node,
      name: `slug`,
      value: aide,
    });
  }
};
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
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

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.frontmatter.path,
      },
    });
  });

  const aideResult = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/aide/" } }) {
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

  aideResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/templates/AidePost.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.frontmatter.path,
      },
    });
  });
};

exports.onPostBuild = () => {
  console.log("Copying locales");
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales"),
  );
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};
