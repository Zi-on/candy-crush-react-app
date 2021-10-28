const { AuthenticationError } = require('apollo-server-express');
const { User, Scores } = require('../models');
const { signToken } = require('../utils/auth');
const {ObjectId} = require('mongojs');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).populate('savedRecipes').populate('bookmarked').select('-__v -password')
  
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
          .select('-__v -password')
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
      },
    },
  
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect email');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password');
        }
  
        const token = signToken(user);
        return { token, user };
      },
    
    }
  };

  module.exports = resolvers;
