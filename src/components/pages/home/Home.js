import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'components/component/Loader/Loader';
const URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGVmYTI0YjEwYTczNzY2Y2QwNjEyMzE2NGM0NjNlMyIsInN1YiI6IjY0NGUzZjJmNmVlY2VlMTdhYjAwZjA5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PeBC6Z1Yveq7Za8a8C_dTjlgd3mkVL0iExNTWrYAYY';
export default function Home() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      axios
        .get(URL, {
          headers: {
            Authorization: `Bearer ${KEY}`,
            Accept: 'application/json',
          },
        })
        .then(response => {
          const movies = response.data.results;

          setMoviesList(movies);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div>
        <h1>Trending today</h1>
        <Loader></Loader>
      </div>
    );
  }
  return (
    <div>
      <main>
        <h1>Trending today</h1>
        <ul>
          {moviesList.map(movie => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
