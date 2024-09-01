import { useEffect, useState } from 'react';
import './App.scss';
import logo from './assets/OMDb-logo.svg';
import { Card } from './components/Card';
import axios from 'axios';

interface DataObject {
  title: string;
  poster: string;
  director: string;
  actor: string;
  genre: string;
  plot: string;
  writer: string;
  imdbRating: string;
  imdbVote: string;
}

function App() {
  const [data, setData] = useState<DataObject | null>(null);

  const [active, setActive] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [textInput, setTextInput] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setActive(true);
  };
  const getMovie = async (textInput: string) => {
    try {
      const result = await axios.get(
        `http://www.omdbapi.com/?t=${textInput}&apikey=5a86865a`
      );
      console.log(result.data.Error);

      if (result.data.Error === 'Movie not found!') {
        setIsError(true);
        setData(null);
      } else {
        setIsError(false);

        setData({
          title: result.data.Title,
          poster: result.data.Poster,
          director: result.data.Director,
          actor: result.data.Actors,
          genre: result.data.Genre,
          plot: result.data.Plot,
          writer: result.data.Writer,
          imdbRating: result.data.imdbRating,
          imdbVote: result.data.imdbVote,
        });
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setData(null);
    }
  };
  useEffect(() => {
    if (textInput.split('').length > 1) {
      getMovie(textInput);
    }
  }, [textInput]);

  return (
    <>
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <div className="search">
          <input
            className="text-input"
            type="text"
            placeholder="Search movie"
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="container">
        {isError ? (
          <p className="error">Movie not found</p>
        ) : (
          data && (
            <Card
              title={data.title}
              poster={data.poster}
              director={data.director}
              actor={data.actor}
              genre={data.genre}
              plot={data.plot}
              writer={data.writer}
              imdbRating={data.imdbRating}
              imdbVote={data.imdbVote}
              active={active}
            />
          )
        )}
      </div>
    </>
  );
}

export default App;
