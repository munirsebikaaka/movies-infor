import { useState } from "react";
import { MdLocalMovies } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import styles from "../styles/Tranding.module.css";
import { useFetchTranding } from "../services/trandingDet";

const Tranding = () => {
  const [tranding, setTranding] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultArr = [
    { img: "imgs/rec1.png", name: "Beyond earth", year: 2020, type: "movie" },
    { img: "imgs/rec2.png", name: "Bottom Gear", year: 2021, type: "movie" },
    {
      img: "imgs/rec3.png",
      name: "Relentless",
      year: 2020,
      type: "movie",
    },
    { img: "imgs/rec4.png", name: "The Diary", year: 2017, type: "Series" },
    { img: "imgs/rec5.png", name: "No Land Beyond", year: 2019, type: "movie" },
    {
      img: "imgs/rec6.png",
      name: "During The Hunt",
      year: 2016,
      type: "Series",
    },
    {
      img: "imgs/rec7.png",
      name: "Autosport The Series",
      year: 2016,
      type: "Series",
    },
    { img: "imgs/rec8.png", name: "Beyond earth", year: 2020, type: "movie" },
    { img: "imgs/rec9.png", name: "Lone Heart", year: 2017, type: "movie" },
    { img: "imgs/rec10.png", name: "112", year: 2013, type: "Series" },
  ];
  useFetchTranding(setTranding, setIsLoading);
  return (
    <>
      <div className={styles.tranding}>
        <h1 className={styles.headT}>Trending</h1>
        {!isLoading ? (
          <ul>
            {tranding.map((el) => (
              <li
                key={el.imdbID}
                style={{
                  backgroundImage: `
                linear-gradient(#00000040,#00000040),url(${el.Poster})`,
                }}
              >
                <div className={styles.trandIconCell}>
                  <FaRegBookmark className="trand-icon" />
                </div>

                <button className={styles.tradPlay}>
                  <IoIosPlayCircle className={styles.iconB} />
                  Play
                </button>

                <div className={styles.det}>
                  <p className={styles.year}>
                    {el.Year} <MdLocalMovies />
                    {el.Type} - PG
                  </p>
                </div>
                <h1>{el.Title}</h1>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {defaultArr.map((el, i) => (
              <li
                key={i + 1}
                style={{
                  backgroundImage: `linear-gradient(#00000040,#00000040),url(${el.img})`,
                }}
              >
                <div className={styles.trandIconCell}>
                  <FaRegBookmark className="trand-icon" />
                </div>
                <button className={styles.tradPlay}>
                  <IoIosPlayCircle className={styles.iconB} />
                  Play
                </button>
                <div className={styles.det}>
                  <p className={styles.year}>
                    {el.year} <MdLocalMovies />
                    {el.type} - PG
                  </p>
                </div>
                <h1>{el.name}</h1>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
export default Tranding;
