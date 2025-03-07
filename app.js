const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const app = express();
const { typeDefs } = require("./src/graphql/typedefs");
const { resolvers } = require("./src/graphql/resolver");
const { logger } = require("./src/utils/logger.util");

const routes = require("./src/routes");

// Middleware for location validation
app.use(express.json());

// REST Endpoints
app.use("/v1", routes);

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    logger.info("Server running on http://localhost:4000");
  });
});

module.exports = { app };
