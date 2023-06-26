import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cast from '../cast/Cast';
import Reviews from '../reviews/Reviews';
import Loader from '../Loader/Loader';
import css from './Hero.module.css';
const KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGVmYTI0YjEwYTczNzY2Y2QwNjEyMzE2NGM0NjNlMyIsInN1YiI6IjY0NGUzZjJmNmVlY2VlMTdhYjAwZjA5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PeBC6Z1Yveq7Za8a8C_dTjlgd3mkVL0iExNTWrYAYY';
const URL = 'https://api.themoviedb.org/3/movie/';

export default function Hero() {
  const location = useLocation();
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [locationURL, setLocationURL] = useState('');
  const backLinkHref = location.state?.from ?? '/';

  console.log(location.state);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchMovieDetails = async () => {
      await axios
        .get(URL + `${movieId}`, {
          headers: {
            Authorization: `Bearer ${KEY}`,
            Accept: 'application/json',
          },
        })
        .then(response => {
          const oneMovie = response.data;
          setMovie(oneMovie);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    };
    if (backLinkHref) {
      setLocationURL(backLinkHref);
    }
    console.log(`location:${locationURL}`);
    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, locationURL]);

  if (isLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <div>
        {movie ? (
          <div>
            <Link to={locationURL} className={css.linkBtn}>
              Go back
            </Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVm-NOFWAwzSDCG2503S24gnb6ij0l6Qz1URGonjsEqkf6fmGza-C7SW9iuHQaJj_7sA&usqp=CAU'
                }
                alt={movie.title}
                style={{
                  display: 'block',
                  marginRight: 30,
                  width: 185,
                  height: 'auto',
                }}
              />
              <div>
                <h2>{movie.title}</h2>
                {movie.vote_average ? (
                  <div>
                    <h4>User Score:</h4>
                    <span>{movie.vote_average}</span>
                  </div>
                ) : (
                  ''
                )}
                <h4>Overview</h4>
                <span>{movie.overview}</span>
                <h4 style={{ marginBottom: 0 }}>Genres:</h4>
                <span style={{ display: 'block', marginBottom: 10 }}>
                  {movie.genres.length > 0
                    ? movie.genres.map(genre => {
                        return ` ${genre.name} `;
                      })
                    : 'sorry, we don`t now genres of this movie'}
                </span>
              </div>
            </div>
            <div className={css.decorationFlex}>
              <Link to={`/movies/${movie.id}/cast`} className={css.linkBtn}>
                Cast
              </Link>
              <Link to={`/movies/${movie.id}/reviews`} className={css.linkBtn}>
                Reviews
              </Link>
            </div>
            {location.pathname === `/movies/${movieId}/cast` && <Cast />}
            {location.pathname === `/movies/${movieId}/reviews` && <Reviews />}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
