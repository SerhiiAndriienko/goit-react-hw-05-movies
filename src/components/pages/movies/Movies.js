import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  // const navigate = useNavigate();
  // const movieName = searchParams.get('query') ?? '';

  const updateQueryString = e => {
    setSearchQuery(e.target.value);
  };
  const searchMovie = e => {
    e.preventDefault();
    setSearchParams({ query: searchQuery });
  };
  useEffect(() => {
    if (searchParams.get('query')) {
      setSearchQuery(searchParams.get('query'));
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

  // const goBack = () => {
  //   navigate('/movies', { replace: true });
  // };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      {/* {movies && (
        <button onClick={goBack} style={{ display: 'block' }}>
          Go back
        </button>
      )} */}

      <form onSubmit={searchMovie}>
        <label>Search here: </label>
        <input
          value={searchQuery}
          onChange={updateQueryString}
          type="text"
          placeholder="Enter here"
        ></input>
        <button type="submit">Search</button>
      </form>

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: `/movies?query=${searchParams.get('query')}` }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
