import classes from './MovieForm.module.css';
import React, {useState} from 'react';

const MovieForm = () => {
    const [enteredTitle, setEnteredTitle]= useState('');
    const [enteredText, setEnteredText]= useState('');
    const [enteredDate, setEnteredDate]= useState('');

    const movieSubmitHandler = (event) =>{
        event.preventDefault();
        const newMovieObj = {
            title: event.target.title.value,
            text: event.target.text.value,
            date: event.target.date.value,
        }
        console.log(newMovieObj);
        setEnteredTitle('');
        setEnteredText('');
        setEnteredDate('');
    }
    
    const titleChangeHandler = (event) =>{
        setEnteredTitle(event.target.value);
    }
    const textChangeHandler = (event) =>{
        setEnteredText(event.target.value);
    }
    const dateChangeHandler = (event) =>{
        setEnteredDate(event.target.value);
    }


    return (
        <section>
            <form onSubmit={movieSubmitHandler}>
                <div className={classes['movie-title']}>
                    <label htmlFor='title'>Title</label><br />
                    <input type='text' id='title' value={enteredTitle} onChange={titleChangeHandler} />
                </div>
                <div className={classes['movie-text']}>
                    <label htmlFor='text'>Opening Text</label><br />
                    <input type='text' id='text' value={enteredText} onChange={textChangeHandler} />
                </div>
                <div className={classes['movie-date']}>
                    <label htmlFor='date'>Release Date</label><br />
                    <input type='date' id='date' value={enteredDate} onChange={dateChangeHandler} />
                </div>
                <button type='submit'>Add Movie</button>
            </form>
        </section>

    )
}

export default MovieForm;