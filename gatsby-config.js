module.exports = {
  siteMetadata: {
    title: "anthonycameron.com",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-favicon",
      options: {
        logo: "./src/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: false,
          twitter: true,
          yandex: false,
          windows: false
        }
      }
    }, {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-26321085-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: false,
      },
    },
  ],
};
