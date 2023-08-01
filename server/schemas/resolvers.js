const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe, Order } = require('../models');
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
      return Recipes.find({})
    }, 

    
  },

  Mutation: {
    addUser: async (parent, args) => {
      return User.create(args);
    },
  },
};

module.exports = resolvers;
