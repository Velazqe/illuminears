
import React, { useEffect, useState } from 'react';

const ClickedCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://api.lorcana-api.com/cards/fetch?displayonly=Image;Name;Abilities;Classifications;type;Rarity;body_text;set_name;card_num')
      .then(response => response.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {cards.map((card, index) => (
        <div key={index} style={{ }}>
          <img src={card.image} alt={card.name} style={{ }} />
          <h2>{card.name}</h2>
          <p><strong>Type:</strong> {card.type}</p>
          <p><strong>Classifications:</strong> {card.classifications}</p>
          <p><strong>Abilities:</strong> {card.abilities}</p>
          <p><strong>Body Text:</strong> {card.body_text}</p>
          <p><strong>Rarity:</strong> {card.rarity}</p>
          <p><strong>Set Name:</strong> {card.set_name}</p>
          <p><strong>Card Number:</strong> {card.card_num}</p>
        </div>
      ))}
    </div>
  );
};

export default ClickedCards;