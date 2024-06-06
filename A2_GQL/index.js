var express = require("express")
const { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql")
const db = require("./models") 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`#graphql
  type User {
    name: String,
    email: String,
    password: String,
    blocked: Boolean,
    createdAt: String
  }

  type Query {
    users: [User]
  }
`)
 
// The root provides a resolver function for each API endpoint
var root = {
  users: async () => {
    return await db.Users.findAll();
  },
}
 
var app = express()
 
// Create and use the GraphQL handler.
app.all(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
)
 
// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")