
const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const graphQlSchema = require("./src/schema")
const graphQlResolvers = require("./src/resolvers")
const mongoose = require("mongoose")

const app = express()

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
)
const uri = `mongodb+srv://mayank:EhdZQ6AmBk2NYP5A@forgo.pthnexi.mongodb.net/nft`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const PORT = process.env.PORT || 4000;
mongoose
  .connect(uri, options)
  .then(() => app.listen(PORT, console.log("Server is listening on 4000")))
  .catch(error => {
    throw error
  })
