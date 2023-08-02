const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
<<<<<<< Updated upstream
    name: String
    skills: [String]!
=======
    firstName: String!
    lastName: String!
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
>>>>>>> Stashed changes
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
<<<<<<< Updated upstream
    addProfile(name: String!): Profile
    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeSkill(profileId: ID!, skill: String!): Profile
=======
    addUser(name: String!): User
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
>>>>>>> Stashed changes
  }
`;

module.exports = typeDefs;
