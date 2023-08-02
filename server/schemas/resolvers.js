
const { Profile } = require('../models');

const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe, Order } = require("../models");
const jwt = require("jsonwebtoken"); // Import the 'jsonwebtoken' library for token verification
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },


    recipes: async () => {
      return Recipe.find({}); // Fix the typo from "Recipes" to "Recipe"
    },

  },

  Mutation: {
    addUser: async (parent, args) => {
      return User.create(args);
    },

    // Add more mutations here
    addRecipe: async (parent, args) => {
      return Recipe.create(args);
    },

    updateRecipe: async (parent, { recipeId, updateData }) => {
      // Assuming `updateData` is an object with the fields to update
      return Recipe.findOneAndUpdate({ _id: recipeId }, updateData, {
        new: true,
      });
    },

    deleteRecipe: async (parent, { recipeId }) => {
      return Recipe.findOneAndDelete({ _id: recipeId });
    },

    addOrder: async (parent, { recipeId }, context) => {
      const token = context.token;
      if (!token) {
        throw new AuthenticationError(
          "User must be logged in to create an order."
        );
      }

      try {
        // Verify the token to get the userId
        const { userId } = jwt.verify(token, "your-secret-key");
        // Replace 'your-secret-key' with your actual secret key used for token signing

        // Create the order with the provided recipeId
        const order = await Order.create({ recipe: recipeId });

        // Add the order to the user's orders array
        await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

        return order;
      } catch (err) {
        throw new AuthenticationError("Invalid token.");
      }
    },
  },
};

module.exports = resolvers;
