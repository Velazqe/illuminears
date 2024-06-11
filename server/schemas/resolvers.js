const { User, Monster } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("monsters");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("monsters");
    },
    monsters: async () => {
      return Monster.find().sort({ name: 1 });
    },
    monster: async (parent, { monsterId }) => {
      return Monster.findOne({ _id: monsterId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("comments");
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addMonster: async (parent, { monsterName, type, habitat, weaknesses }) => {
      const monster = await Monster.create({
        monsterName,
        type,
        habitat,
        weaknesses,
      });

      return monster;
    },
    addComment: async (parent, { monsterId, commentText }, context) => {
      if (context.user) {
        return Monster.findOneAndUpdate(
          { _id: monsterId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeMonster: async (parent, { monsterId }, context) => {
      const monster = await Monster.findOneAndDelete({
        _id: monsterId,
      });

      return monster;
    },
    removeComment: async (parent, { monsterId, commentId }, context) => {
      if (context.user) {
        return Monster.findOneAndUpdate(
          { _id: monsterId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateComment: async (parent, { monsterId, commentId, commentText }) => {
      return Monster.findOneAndUpdate(
        { _id: monsterId, "comments._id": commentId },
        { $set: { "comments.$.commentText": commentText } },
        { new: true }
      );
    },
    updateMonster: async (
      parent,
      { monsterId, monsterName, type, habitat, weaknesses }
    ) => {
      const updateFields = {};
      if (monsterName) updateFields.monsterName = monsterName;
      if (type) updateFields.type = type;
      if (habitat) updateFields.habitat = habitat;
      if (weaknesses) updateFields.weaknesses = weaknesses;

      return Monster.findOneAndUpdate(
        { _id: monsterId },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
