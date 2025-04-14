import { IoIosPlayCircle } from "react-icons/io";
import { MdLocalMovies } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import styles from "../styles/HomePage.module.css";
import AppNav from "../features/ApplicationNavigation";
import { useEffect, useState } from "react";
import { bookMarkedMoviesAndSeries } from "../services/bookmarksArr";

const BookMarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    if (bookMarkedMoviesAndSeries?.length > 0) {
      setBookmarks(bookMarkedMoviesAndSeries);
    }
  }, []);

  const filteredMovies = bookmarks.filter((el) => el.Type === "movie");
  const filteredSeries = bookmarks.filter((el) => el.Type === "series");

  const delateBookmarkedMoviesAndSeries = (imdbID) => {
    const updatedMovies = bookmarks.filter((movie) => movie.imdbID !== imdbID);
    setBookmarks(updatedMovies);
    const bookmarkedMAndS = updatedMovies.map((el) => el);
    localStorage.setItem("moviesAndSeries", JSON.stringify(bookmarkedMAndS));
  };
  return (
    <>
      <AppNav />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.search}>
            <IoSearch className={styles.ico} />
            <input type="text" placeholder="Search for movies or TV series" />
          </div>
          <h1 className={styles.head}>Bookmarked Movies</h1>
          <ul className={styles.moviesList}>
            {filteredMovies.length < 1 ? (
              <h1>You han't bookmarked any movies yet</h1>
            ) : (
              filteredMovies.map((el) => (
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
                      onClick={() => delateBookmarkedMoviesAndSeries(el.imdbID)}
                      className={styles.bookmarkCell}
                    >
                      <BsBookmarkFill className={styles.bookmark} />
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
            )}
          </ul>

          <h1 className={styles.head}>Bookmarked TVseries</h1>
          <ul className={styles.moviesList}>
            {filteredSeries.length < 1 ? (
              <h1>You haven't bookmarked and TVseries yet </h1>
            ) : (
              filteredSeries.map((el) => (
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
                      onClick={() => delateBookmarkedMoviesAndSeries(el.imdbID)}
                      className={styles.bookmarkCell}
                    >
                      <BsBookmarkFill className={styles.bookmark} />
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
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default BookMarks;
