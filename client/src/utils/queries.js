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
    deckName
    user_id
    cards {
      image
      name
      type
      card_num
      count
    }
  }
}
`;

export const QUERY_SINGLE_DECK = gql`
query getSingleDeck($deckId: ID!) {
  deck(deckId: $deckId) {
    _id
    deckName
    user_id
    cards {
      _id
      artist
      set_name
      classifications
      abilities
      set_num
      color
      franchise
      image
      cost
      inkable
      name
      type
      lore
      rarity
      flavor_text
      unique_id
      card_num
      body_text
      willpower
      card_variants
      strength
      set_id
      count
    }
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
      _id
      artist
      set_name
      classifications
      abilities
      set_num
      color
      franchise
      image
      cost
      inkable
      name
      type
      lore
      rarity
      flavor_text
      unique_id
      card_num
      body_text
      willpower
      card_variants
      strength
      set_id
      count
    }
  }
}
`;
