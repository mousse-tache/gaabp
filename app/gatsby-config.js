module.exports = {
  siteMetadata: {
    siteUrl: process.env.GATSBY_SITE_URL ? process.env.GATSBY_SITE_URL : "http://localhost:8000/",
    title: `AABP`,
    description: `Site web de l'Association des Aventuriers de Baden-Powell qui offre du scoutisme traditionnel à partir de 7 ans.`,
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
        icon: `src/images/Logo_AABP.gif`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
          plugins: [
              {
                  resolve: `gatsby-remark-images-native-lazy-load`,
                  options: {
                      loading: "lazy" // "lazy" | "eager" | "auto"
                      }
                  }
          ],
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
