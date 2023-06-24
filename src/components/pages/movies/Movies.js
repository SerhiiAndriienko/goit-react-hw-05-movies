import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from 'components/component/Loader/Loader';

const URL = 'https://api.themoviedb.org/3/search/movie?query=';
const KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGVmYTI0YjEwYTczNzY2Y2QwNjEyMzE2NGM0NjNlMyIsInN1YiI6IjY0NGUzZjJmNmVlY2VlMTdhYjAwZjA5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PeBC6Z1Yveq7Za8a8C_dTjlgd3mkVL0iExNTWrYAYY';

export default function Movies() {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const movieName = searchParams.get('query') ?? '';

  const updateQueryString = e => {
    setSearchQuery(e.target.value);
  };
  const searchMovie = () => {
    setSearchParams({ query: searchQuery });
  };
  useEffect(() => {
    if (searchParams.get('query')) {
      setIsLoading(true);
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(
            `${URL}${searchParams.get(
              'query'
            )}&include_adult=false&language=en-US&page=1`,
            {
              headers: {
                Authorization: `Bearer ${KEY}`,
                Accept: 'application/json',
              },
            }
          );
          const moviesList = response.data;
          setMovies(moviesList.results);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      fetchMovieDetails();
    } else {
      setMovies(null);
    }
  }, [searchParams]);

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      {movies && (
        <button onClick={goBack} style={{ display: 'block' }}>
          Go back
        </button>
      )}

      <span>Search here: </span>
      <input
        value={searchQuery}
        onChange={updateQueryString}
        type="text"
        placeholder="Enter here"
      ></input>
      <button onClick={searchMovie}>Search</button>

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
