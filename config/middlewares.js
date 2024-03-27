module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://spabackendstack-publicbucketa6745c15-1h205or1odjlu.s3.ap-southeast-1.amazonaws.com",
            "https://market-assets.strapi.io",
            "*.amazonaws.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://spabackendstack-publicbucketa6745c15-1h205or1odjlu.s3.ap-southeast-1.amazonaws.com",
            "https://market-assets.strapi.io",
            "*.amazonaws.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
