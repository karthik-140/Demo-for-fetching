import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelFetchHandler = () => {
    setError(null)
    console.log("cancel")
  }

  const fetchMoviesHandler =useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/')

      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      console.log("error");
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    if (error) {
      setInterval(() => {
        fetch('https://swapi.dev/api/films/')
        console.log("useEffect");
      }, 2000)
    }
  }, [error])

  useEffect(() =>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  let content = <p>No movies found.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (error) {
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={cancelFetchHandler}>Cancel</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
