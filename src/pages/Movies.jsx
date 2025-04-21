import { MdLocalMovies } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import { BsBookmarkFill } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { pushToMarked } from "../services/pushToBookmarked";
import styles from "../styles/HomePage.module.css";
import AppNav from "../features/ApplicationNavigation";
import Error from "../features/ErrorMsg";
const Movies = ({
  movies,
  setMovies,
  movieDefault,
  error,
  MovieInput,
  setMovieInput,
  logedInEmail,
}) => {
  return (
    <div className={styles.container}>
      <AppNav logedInEmail={logedInEmail} />

      <div className={styles.main}>
        <div className={styles.search}>
          <IoSearch className={styles.ico} />
          <input
            type="text"
            placeholder="Search for movies or TV series"
            value={MovieInput}
            onChange={(e) => setMovieInput(e.target.value)}
          />
        </div>
        <h1 className={styles.head}>Movies</h1>
        <ul className={styles.moviesList}>
          {!movieDefault ? (
            movies.map((el) => (
              <li key={el.imdbID}>
                <div
                  className={styles.list}
                  style={{
                    backgroundImage: `linear-gradient(#00000040,#00000040),url(${el.Poster})`,
                  }}
                >
                  <button className={styles.play}>
                    <IoIosPlayCircle className={styles.iconB} />
                    Play
                  </button>

                  <div
                    onClick={() => pushToMarked(movies, el.imdbID, setMovies)}
                    className={styles.bookmarkCell}
                  >
                    {!el.isBookMarked ? (
                      <FaRegBookmark className={styles.bookmark} />
                    ) : (
                      <BsBookmarkFill />
                    )}
                  </div>
                </div>
                <div className={styles.det}>
                  <p className={styles.year}>
                    {el.Year}
                    <MdLocalMovies /> {el.Type} - PG
                  </p>
                </div>
                <h1>{el.Title}</h1>
              </li>
            ))
          ) : (
            <div>
              {error.length > 0 ? (
                <Error error={error} />
              ) : (
                <h1 className={styles.loader}>
                  <BeatLoader color="white" />
                </h1>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Movies;
