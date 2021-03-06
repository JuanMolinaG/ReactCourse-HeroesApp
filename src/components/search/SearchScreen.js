import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    search: q,
  });
  const { search } = formValues;

  // const heroesFiltered = getHeroesByName(search);
  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${search}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Search Form</h4>
          <form onSubmit={handleSearch} autoComplete='off'>
            <input
              type='text'
              placeholder='Find your hero'
              className='form-control'
              name='search'
              value={search}
              onChange={handleInputChange}
            />
            <button
              type='submit'
              className='btn mt-1 btn-block btn-outline-primary'
            >
              Search
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Results</h4>
          <hr />
          <div className='row'>
            {q === '' && (
              <div className='alert alert-info col-12'>Search a hero</div>
            )}
            {q !== '' && heroesFiltered.length === 0 && (
              <div className='alert alert-danger col-12'>
                There is no a hero called {q}
              </div>
            )}
            {heroesFiltered.map((hero) => (
              <HeroCard key={hero.id} {...hero} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
