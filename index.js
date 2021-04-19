const express = require('express');
const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express');
const types = require('./types/index')

require('dotenv').config()

if (!process.env.SIMPLYRETS_USER 
    || !process.env.SIMPLYRETS_PASSWORD 
    || !process.env.GRAPHQL_USER
    || process.env.GRAPHQL_PASSWPRD) {
      throw new Error("Environment variables not set. Please ensure Prerequisites in README");
}
const  { simplyRETS } = require("./listingApi")
const simplyrets_user = process.env.SIMPLYRETS_USER 
const simplyrets_password = process.env.SIMPLYRETS_PASSWORD
const simplyRETSApi = new simplyRETS(simplyrets_user,simplyrets_password)

const PORT = 4000;

//TODO : externalize 
const graphql_userId = process.env.GRAPHQL_USER
const graphql_password = process.env.GRAPHQL_PASSWPRD
const BearerToken = `Bearer ${graphql_userId}/${graphql_password}`


async function startApolloServer() {

  const app = express();

  const typeDefs = gql`
    type Query { properties: [Listing] }
    ${types}
    `;
  
  const resolvers = {
    Query: {
      properties: async (city) => {
        var properties = await simplyRETSApi.GetPropertiesByCity(city)
        return properties
      },
    },
  }

  const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => {
      
      const token = req.headers.authorization || '';

      let user = { }

      if (!token != BearerToken) {
       // throw new AuthenticationError('Unauthorized!');
      } else {
        //todo:  process token to retrieve user
      }

      return { 
        req,
        user  
      };
    },
    plugins: [
      {

      }]
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  await new Promise(resolve => app.listen({ port: PORT }, resolve));

  return { server, app };
}

startApolloServer();

//TODO : logging middelwere ?