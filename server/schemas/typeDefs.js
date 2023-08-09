const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
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
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addSkill(userId: ID!, skill: String!): User
    removeUser(userId: ID!): User
    addRecipe(
      name: String!
      description: String
      image: String
      servingSize: Int
      ingredients: String
      instructions: String
    ): Recipe
    updateRecipe(
      recipeId: ID!
      updateData: UpdateRecipeInput!
    ): Recipe
    deleteRecipe(recipeId: ID!): Recipe
    # Add the addOrder mutation here
    addOrder(recipeId: ID!): Order
  }

  # Define an input type for updateRecipe mutation
  input UpdateRecipeInput {
    name: String
    description: String
    image: String
    servingSize: Int
    ingredients: String
    instructions: String
  }
`;

module.exports = typeDefs;
