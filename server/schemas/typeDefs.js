const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [Deck]
  }

  type Deck {
    _id: ID
    deckName: String!
    cards: [Card]
    user_id: ID!
  }

  type Card {
   _id: ID
  artist: String
  set_name: String
  classifications: String
  abilities: String
  set_num: Int
  color: String
  franchise: String
  image: String!
  cost: Int
  inkable: Boolean
  name: String!
  type: String!
  lore: Int
  rarity: String
  flavor_text: String
  unique_id: String
  card_num: Int!
  body_text: String
  willpower: Int
  card_variants: String
  strength: Int
  set_id: String
  move_cost: Int
  count: Int!
  }

input CardInput {
  _id: ID
  artist: String
  set_name: String
  classifications: String
  abilities: String
  set_num: Int
  color: String
  franchise: String
  image: String!
  cost: Int
  inkable: Boolean
  name: String!
  type: String!
  lore: Int
  rarity: String
  flavor_text: String
  unique_id: String
  card_num: Int!
  body_text: String
  willpower: Int
  card_variants: String
  strength: Int
  set_id: String
  move_cost: Int
  count: Int!
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    decks(username: String): [Deck]
    deck(deckId: ID!): Deck
    me: User
    myDecks: [Deck]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDeck(deckName: String!, cards: [CardInput]): Deck
    updateDeck(deckId: ID!, deckName: String, cards: [CardInput]): Deck
    addCard(deckId: ID!, image: String!): Deck
    removeDeck(deckId: ID!): Deck
    removeCard(deckId: ID!, cardId: ID!): Deck
  }
`;

module.exports = typeDefs;


// input CardInput {
//   _id: ID
//   Artist: String!  
//   Set_Name: String!
//   Classifications: String!
//   Abilities: String
//   Set_Num: Int!  
//   Color: String!
//   Franchise: String
//   Image: String!
//   Cost: Int!
//   Inkable: Boolean!
//   Name: String!
//   Type: String!
//   Lore: Int!
//   Rarity: String!
//   Unique_ID: String!
//   Card_Num: Int!
//   Body_Text: String
//   Willpower: Int!
//   Strength: Int!
//   Set_ID: String!
// }