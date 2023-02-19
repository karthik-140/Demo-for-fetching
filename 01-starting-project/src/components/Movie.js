import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  const movieDeleteHandler =async () =>{
    console.log(props.id)
    const response = await fetch(`https://react-post-request-62aa3-default-rtdb.firebaseio.com/movies/${props.id}.json`,{
      method: "DELETE",
    })
    return response.json();
    // const data = response.json();
    //  console.log(data)
    //  console.log(props)
  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button style={{backgroundColor: 'grey'}} onClick={movieDeleteHandler}>Delete</button>
    </li>
  );
};

export default Movie;
