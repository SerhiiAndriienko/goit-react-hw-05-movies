import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
const URL = 'https://api.themoviedb.org/3/movie/';
const KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGVmYTI0YjEwYTczNzY2Y2QwNjEyMzE2NGM0NjNlMyIsInN1YiI6IjY0NGUzZjJmNmVlY2VlMTdhYjAwZjA5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PeBC6Z1Yveq7Za8a8C_dTjlgd3mkVL0iExNTWrYAYY';

export default function Reviews() {
  // const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      await axios
        .get(`${URL}${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer ${KEY}`,
            Accept: 'application/json',
          },
        })
        .then(response => {
          const oneMovie = response.data;
          setMovie(oneMovie);
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchMovieDetails();
  }, [movieId]);
  if (!movie) {
    return <Loader></Loader>;
  }
  return (
    <div>
      {movie.results.length !== 0
        ? movie.results.map(review => (
            <div key={review.id}>
              <h5>Autor: {review.author}</h5>
              <p>{review.content}</p>
            </div>
          ))
        : 'We don`t have any reviews for this movie.'}
    </div>
  );
}
