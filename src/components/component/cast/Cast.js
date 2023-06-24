import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const URL = 'https://api.themoviedb.org/3/movie/';
const KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGVmYTI0YjEwYTczNzY2Y2QwNjEyMzE2NGM0NjNlMyIsInN1YiI6IjY0NGUzZjJmNmVlY2VlMTdhYjAwZjA5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PeBC6Z1Yveq7Za8a8C_dTjlgd3mkVL0iExNTWrYAYY';

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      await axios
        .get(`${URL}${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${KEY}`,
            Accept: 'application/json',
          },
        })
        .then(response => {
          const casts = response.data;
          setActors(casts);
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchMovieDetails();
  }, [movieId]);
  if (!actors) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {actors.cast.map(actor => (
        <li key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
            }
            alt={actor.name}
            style={{ display: 'block', marginRight: 30, width: 185 }}
          />
          <p style={{ fontWeight: 'bold', marginBottom: 0, marginTop: 5 }}>
            {actor.name}
          </p>
          <p style={{ marginTop: 0 }}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
