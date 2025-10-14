// utils/typesenseClient.js
const Typesense = require("typesense");

const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: "rze2domv97ybs6l1p-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "NO8TzwSReXqhJyJSa6EnLy184PG5TkQO",
  connectionTimeoutSeconds: 5,
});

module.exports = typesenseClient;
