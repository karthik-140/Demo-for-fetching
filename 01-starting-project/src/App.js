import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelFetchHandler = () => {
    setError(null)
    console.log("cancel")
  }

  const fetchMoviesHandler =useCallback(async () => {
    console.log("test");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-post-request-62aa3-default-rtdb.firebaseio.com/movies.json')

      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const data = await response.json();
       console.log(data);
      const loadedMovies = [];
      for (const key in data){
        console.log(key);
         loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releseDate: data[key].releaseDate,
         })
      }
      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date
      //   }
      // })
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
      console.log("error");
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    console.log(error)
    if (error) {
    const intervalId = setInterval(() => {
        fetch('https://react-post-request-62aa3-default-rtdb.firebaseio.com/movies.json')
        console.log("useEffect");
      }, 2000)
      return () =>{
        clearInterval(intervalId);
      }
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
      <MovieForm />
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
