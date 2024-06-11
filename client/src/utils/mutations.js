import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MONSTER = gql`
  mutation addMonster(
    $monsterName: String!
    $type: String!
    $habitat: String!
    $weaknesses: [String]!
  ) {
    addMonster(
      monsterName: $monsterName
      type: $type
      habitat: $habitat
      weaknesses: $weaknesses
    ) {
      weaknesses
      habitat
      type
      monsterName
      _id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($monsterId: ID!, $commentText: String!) {
    addComment(monsterId: $monsterId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_MONSTER = gql`
  mutation removeMonster($monsterId: ID!) {
    removeMonster(monsterId: $monsterId) {
      _id
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($monsterId: ID!, $commentId: ID!) {
    removeComment(monsterId: $monsterId, commentId: $commentId) {
      _id
      comments {
        _id
        commentText
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $monsterId: ID!
    $commentId: ID!
    $commentText: String!
  ) {
    updateComment(
      monsterId: $monsterId
      commentId: $commentId
      commentText: $commentText
    ) {
      _id
      comments {
        _id
        commentText
      }
    }
  }
`;

export const UPDATE_MONSTER = gql`
  mutation updateMonster(
    $monsterId: ID!
    $monsterName: String
    $type: String
    $habitat: String
    $weaknesses: [String]
  ) {
    updateMonster(
      monsterId: $monsterId
      monsterName: $monsterName
      type: $type
      habitat: $habitat
      weaknesses: $weaknesses
    ) {
      _id
      monsterName
      type
      habitat
      weaknesses
    }
  }
`;
