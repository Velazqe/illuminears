const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Monster {
    _id: ID
    monsterName: String!
    type: String!
    habitat: String!
    weaknesses: [String]!
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    monsters(username: String): [Monster]
    monster(monsterId: ID!): Monster
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMonster(monsterName: String!, type: String!, habitat: String!, weaknesses: [String]!): Monster
    updateMonster(monsterId: ID!, monsterName: String, type: String, habitat: String, weaknesses: [String]): Monster
      removeMonster(monsterId: ID!): Monster
    addComment(monsterId: ID!, commentText: String!): Monster
    updateComment(monsterId: ID!, commentId: ID!, commentText: String!): Monster
    removeComment(monsterId: ID!, commentId: ID!): Monster
  }
`;

module.exports = typeDefs;
