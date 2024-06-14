const { User, Deck } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
      .populate("decks");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .populate("decks");
    },
    decks: async () => {
      return Deck.find().sort({ name: 1 });
    },
    deck: async (parent, { deckId }) => {
      return Deck.findOne({ _id: deckId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("decks");
      }
      throw AuthenticationError;
    },
    myDecks: async (parent, args, context) => {
      if (context.user) {
        return Deck.find({ user_id: context.user._id }).sort({ name: 1 }); 
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
    addDeck: async (parent, { deckName, cards }, context) => {
      
      const deck = await Deck.create({
        deckName,
        cards,
        user_id: context.user._id,
      });
      console.log(deck);
      return deck;
    },
    addCard: async (parent, { deckId, image }, context) => {
      if (context.user) {
        return Deck.findOneAndUpdate(
          { _id: deckId },
          {
            $addToSet: {
              cards: { image },
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
    removeDeck: async (parent, { deckId }, context) => {
      const deck = await Deck.findOneAndDelete({
        _id: deckId,
      });

      return deck;
    },
    removeCard: async (parent, { deckId, cardId }, context) => {
      if (context.user) {
        return Deck.findOneAndUpdate(
          { _id: deckId },
          {
            $pull: {
              cards: {
                _id: cardId,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateDeck: async (
      parent,
      { deckId, deckName, cards }
    ) => {
      const updateFields = {};
      if (deckName) updateFields.deckName = deckName;
      if (cards) updateFields.cards = cards;

      return Deck.findOneAndUpdate(
        { _id: deckId },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

// cards.map((card) => {
//   return {
//     _id: card._id, // Assuming you have an ID field for the card in your data model
//     // artist: card.Artist,
//     // set_name: card.Set_name,
//     // classifications: card.Classifications,
//     // abilities: card.Abilities,
//     // set_num: card.Set_Num,
//     // color: card.Color,
//     // franchise: card.Franchise,
//     image: card.Image,
//     // cost: card.Cost,
//     // inkable: card.Inkable,
//     // name: card.Name,
//     // type: card.Type,
//     // lore: card.Lore,
//     // rarity: card.Rarity,
//     // unique_id: card.Unique_ID,
//     // card_num: card.Card_Num,
//     // body_text: card.Body_Text,
//     // willpower: card.Willpower,
//     // strength: card.Strength,
//     // set_id: card.Set_ID, // Case-sensitive matching for Set_ID
//   };
// }),
