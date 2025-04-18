import { useState } from "react";
import { BrowserRouter, data, Route, Routes } from "react-router-dom";
import { useFetchDetail } from "./services/GetHomeData";
import Login from "./features/Login";
import SignIn from "./features/SignUp";
import BookMarks from "./pages/Bookmarks";
import HomePage from "./pages/Home";
import styles from "../src/styles/Body.module.css";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TvSeries";
import AboutAccount from "./features/accountProfile";

const App = () => {
  const [movieDetails, setMoviesDetalis] = useState([]);
  const [movieDetailsDefault, setMoviesDetalisDefault] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieDefault, setMoviesDefault] = useState(false);
  const [tvseries, setTvSeries] = useState([]);
  const [tvSeriesDefault, setTvSeriesDefault] = useState(false);
  const [toggleRegstration, setToggleRegstration] = useState(false);
  let [logedInEmail, setLogedInEmail] = useState("");
  const [showApp, setShowA] = useState(false);

  const [error, setError] = useState("");
  const [homeInput, setHomeInput] = useState("");
  const [MovieInput, setMovieInput] = useState("");
  const [seriesInput, setSeriesInput] = useState("");

  useFetchDetail(
    setMoviesDetalis,
    setMoviesDetalisDefault,
    "break",
    setError,
    homeInput
  );
  useFetchDetail(setMovies, setMoviesDefault, "kill", setError, MovieInput);
  useFetchDetail(
    setTvSeries,
    setTvSeriesDefault,
    "spartacus",
    setError,
    seriesInput
  );
  const checkLengthOfMovieNames = (array) => {
    array.map((el) => {
      const movieName = el.Title;
      const arrMovie = movieName.split(" ");
      if (arrMovie.length > 3) {
        const movieName = arrMovie.slice(0, 2).join(" ");
        el.Title = movieName;
      }
    });
  };
  checkLengthOfMovieNames(movies);
  checkLengthOfMovieNames(tvseries);
  checkLengthOfMovieNames(movieDetails);

  return (
    <div className={styles.body}>
      {!showApp ? (
        <div>
          {!toggleRegstration ? (
            <Login
              setToggleRegstration={setToggleRegstration}
              setShowA={setShowA}
              setLogedInEmail={setLogedInEmail}
            />
          ) : (
            <SignIn
              setToggleRegstration={setToggleRegstration}
              setShowA={setShowA}
            />
          )}
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  movieDetails={movieDetails}
                  setMoviesDetalis={setMoviesDetalis}
                  movieDetailsDefault={movieDetailsDefault}
                  error={error}
                  homeInput={homeInput}
                  setHomeInput={setHomeInput}
                />
              }
            />
            <Route
              path="movies"
              element={
                <Movies
                  movies={movies}
                  setMovies={setMovies}
                  movieDefault={movieDefault}
                  error={error}
                  MovieInput={MovieInput}
                  setMovieInput={setMovieInput}
                />
              }
            />
            <Route
              path="tvseries"
              element={
                <TVSeries
                  tvseries={tvseries}
                  setTvSeries={setTvSeries}
                  tvSeriesDefault={tvSeriesDefault}
                  error={error}
                  seriesInput={seriesInput}
                  setSeriesInput={setSeriesInput}
                />
              }
            />
            <Route path="bookmarks" element={<BookMarks />} />
            <Route
              path="profile"
              element={<AboutAccount logedInEmail={logedInEmail} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};
export default App;
