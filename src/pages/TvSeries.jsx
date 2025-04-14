import { MdLocalMovies } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import { BsBookmarkFill } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { pushToMarked } from "../services/pushToBookmarked";
import AppNav from "../features/ApplicationNavigation";
import styles from "../styles/HomePage.module.css";
import Error from "../features/ErrorMsg";

const TVSeries = ({
  tvseries,
  setTvSeries,
  tvSeriesDefault,
  error,
  seriesInput,
  setSeriesInput,
}) => {
  return (
    <>
      <AppNav />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.search}>
            <IoSearch className={styles.ico} />
            <input
              type="text"
              placeholder="Search for movies or TV series"
              value={seriesInput}
              onChange={(e) => setSeriesInput(e.target.value)}
            />
          </div>
          <h1 className={styles.head}>TV Series</h1>
          <ul className={styles.moviesList}>
            {!tvSeriesDefault ? (
              tvseries.map((el) => (
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
                      onClick={() =>
                        pushToMarked(tvseries, el.imdbID, setTvSeries)
                      }
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
    </>
  );
};
export default TVSeries;
