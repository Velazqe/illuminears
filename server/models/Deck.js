const { Schema, model } = require("mongoose");

const deckSchema = new Schema({
  deckName: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  cards: [
    {
      image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      artist: {
        type: String
      },
      set_name: {
        type: String
      },
      classifications: {
        type: String
      },
      abilities: {
        type: String
      },
      set_num: {
        type: Number 
      },
      color: {
        type: String
      },
      franchise: {
        type: String
      },
      cost: {
        type: Number
      },
      inkable: {
        type: Boolean
      },
      type: {
        type: String
      },
      lore: {
        type: Number
      },
      rarity: {
        type: String
      },
      flavor_text: {
        type: String
      },
      unique_id: {
        type: String
      },
      card_num: {
        type: Number
      },
      body_text: {
        type: String
      },
      willpower: {
        type: Number
      },
      card_variants: {
        type: String
      },
      strength: {
        type: Number
      },
      set_id: {
        type: String
      },
      move_cost: {
        type: Number
      },
      count: {
        type: Number
      },
    },
  ],
});

const Deck = model("Deck", deckSchema);

module.exports = Deck;
