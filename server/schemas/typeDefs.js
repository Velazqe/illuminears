const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Deck {
    _id: ID
    deckName: String!
    cards: [Card]
  }

  type Card {
    _id: ID
    image: String!
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDeck(deckName: String!, cards: [String]!): Deck
    updateDeck(deckId: ID!, deckName: String, cards: [String]): Deck
    removeDeck(deckId: ID!): Deck
    addCard(deckId: ID!, image: String!): Deck
    removeCard(deckId: ID!, cardId: ID!): Deck
  }
`;

module.exports = typeDefs;
