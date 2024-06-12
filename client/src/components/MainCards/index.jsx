
import { Container, Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MainCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);


  useEffect(() => {
    fetchCards(currentPage);
  }, [currentPage]);

  const fetchCards = (page) => {
    setLoading(true);
    fetch(`http://api.lorcana-api.com/cards/fetch?displayonly=Image&page=${page}&limit=${cardsPerPage}`)
      .then(response => response.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <div>
        {cards.map((card, index) => (
          <div key={index} style={{  }}>
            <img src={card.image} alt={card.name} style={{ }} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default MainCards;