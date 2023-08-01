const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    recipes: [Recipe]
    orders: [Order]
  }

  type Recipe {
    _id: ID
    name: String!
    description: String
    image: String
    servingSize: Int
    ingredients: String
    instructions: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    recipe: [Recipe]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    recipes: [Recipe]!
    order: [Order]!
  }

  type Mutation {
    addUser(name: String!): User
    addSkill(userId: ID!, skill: String!): User
    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;
