const { Schema, model } = require("mongoose");

const deckSchema = new Schema({
  deckName: {
    type: String,
    required: true,
  },
  cards: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const Deck = model("Deck", deckSchema);

module.exports = Deck;
