import { MdWindow } from "react-icons/md";
import { MdMovie } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import { BsBookmarkFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navigation.module.css";
import { useEffect, useState } from "react";

const AppNav = ({ logedInEmail }) => {
  const [firstLetters, setFirstLetters] = useState("");
  const [lastLetters, setLastLetters] = useState("");
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const getFirsLetterName = () =>
      accounts
        .filter((el) => el.email === logedInEmail)
        .map((el) => el.firstName)
        .join("");
    setFirstLetters(getFirsLetterName());

    const getLastLetterName = () =>
      accounts
        .filter((el) => el.email === logedInEmail)
        .map((el) => el.lastName)
        .join("");
    setLastLetters(getLastLetterName());
  }, []);
  return (
    <nav className={styles.nav}>
      <button className={styles.outerBtn}>
        <MdMovie className={styles.link1} />
      </button>
      <ul>
        <button className={styles.innerBtn}>
          <MdMovie className={styles.link1} />
        </button>
        <li>
          <NavLink to={"/"} className={styles.link}>
            <MdWindow />
          </NavLink>
        </li>
        <li>
          <NavLink to={"/movies"} className={styles.link}>
            <MdLocalMovies />
          </NavLink>
        </li>
        <li>
          <NavLink to={"/tvseries"} className={styles.link}>
            <TbDeviceTvOld />
          </NavLink>
        </li>
        <li>
          <NavLink to={"/bookmarks"} className={styles.link}>
            <BsBookmarkFill />
          </NavLink>
        </li>
      </ul>
      <NavLink to={"/profile"} className={styles.link}>
        {/* <img src="imgs/nav.jpg" alt="Account profile" /> */}
        <div className={styles.profilePic}>
          <h2>{firstLetters[0]}</h2>
          <h2>{lastLetters[0]}</h2>
        </div>
      </NavLink>
    </nav>
  );
};
export default AppNav;
