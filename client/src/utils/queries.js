import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_DECKS = gql`
query getDecks {
  decks {
    _id
    cards {
      _id
      image
    }
    deckName
  }
}
`;

export const QUERY_SINGLE_DECK = gql`
query getSingleDeck($deckId: ID!) {
  deck(deckId: $deckId) {
    _id
    cards {
      _id
      image
      name
    }
    deckName
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_MY_DECKS = gql`
query MyDecks {
  myDecks {
    _id
    deckName
    user_id
    cards {
      image
      name
    }
  }
}
`;
