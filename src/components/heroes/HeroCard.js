import React from 'react';
import { Link } from 'react-router-dom';
import './heroCard.css';

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  return (
    <div className='card-container col-md-4 col-sm-6'>
      <div className='card-flip'>
        <div className='card front'>
          <img
            src={`./assets/heroes/${id}.jpg`}
            className='card-img'
            alt={superhero}
          />
        </div>
        <div className='card back p-4'>
          <div className='card-block'>
            <h5 className='card-title'>{superhero}</h5>
            <p className='card-text'>
              <b>Alter Ego:</b> {alter_ego}
            </p>
            {alter_ego !== characters && (
              <p className='card-text'>
                <b>Characters:</b> {characters}
              </p>
            )}
            <p className='card-text'>
              <small className='text-muted'>
                <b>First Appeatance:</b> {first_appearance}
              </small>
            </p>
            <Link to={`./hero/${id}`}>More...</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
