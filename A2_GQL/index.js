var express = require("express")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")
const resolver = require("./graphql/resolver")
 
var app = express()
 
// Create and use the GraphQL handler.
app.all(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  })
)
 
// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")