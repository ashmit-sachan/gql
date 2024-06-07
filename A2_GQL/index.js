const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { execute, subscribe } = require("graphql");
const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");

const { createServer } = require("http");
const { useServer } = require("graphql-ws/lib/use/ws");
const { WebSocketServer } = require("ws");

const app = express();

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true // Enable GraphiQL interface
  })
);

// Start the server at port 4000
const server = createServer(app);

// Set up the WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server,
  path: "/graphql",
});

useServer({ schema, execute, subscribe, rootValue: resolver }, wsServer);

server.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
  console.log("WebSocket subscriptions are available at ws://localhost:4000/graphql");
});
