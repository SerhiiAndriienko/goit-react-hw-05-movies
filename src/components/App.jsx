import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Hero from './component/Hero/Hero';
import Home from './pages/home/Home';
import Movies from './pages/movies/Movies';
import NotFound from './pages/notFound/NotFound';
import Header from './component/header/Header';
import Cast from './component/cast/Cast';
import Reviews from './component/reviews/Reviews';

export const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movie/:movieId" element={<Hero />}>
            <Route path="/movie/:movieId/cast" element={<Cast />} />
            <Route path="/movie/:movieId/reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound></NotFound>} />
        </Route>
      </Routes>
    </main>
  );
};
