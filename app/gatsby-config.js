module.exports = {
  siteMetadata: {
    siteUrl: process.env.GATSBY_SITE_URL ? process.env.GATSBY_SITE_URL : "http://localhost:8000/",
    title: `AABP`,
    description: `Site web de l'Association des Aventuriers de Baden-Powell qui offre du scoutisme traditionnel pour les jeunes et les moins jeunes à partir de 7 ans.`,
    author: `AABP`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#A3233A`,
        theme_color: `#A3233A`,
        display: `minimal-ui`,
        icon: `src/images/Logo_AABP.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
          plugins: [
              {
                // Using gatsby-remark-embed-video before gatsby-remark-images & gatsby-remark-responsive-iframe plugins.
                resolve: `gatsby-remark-embed-video`,
                options: {
                    maxWidth: 800,
                    ratio: 1.77,
                    height: 400,
                    related: false,
                    noIframerder: true,
                },
              },
              {
                  resolve: `gatsby-remark-images-native-lazy-load`,
                  options: {
                      loading: "lazy" // "lazy" | "eager" | "auto"
                      }
              },
              {
                resolve: `gatsby-remark-responsive-iframe`,
                options: {
                    wrapperStyle: `margin-bottom: 1.0725rem`,
                },
              },
          ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx'],
        exclude: ['node_modules', '.cache', 'public'],
        // Any eslint-webpack-plugin options below
      }
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },    
    'gatsby-plugin-postcss'

  ],
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  }  
};
