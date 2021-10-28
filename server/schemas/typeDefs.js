const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedRecipes: [Recipe]
    bookmarked: [Recipe]
  }
  `

  module.exports = typeDefs;