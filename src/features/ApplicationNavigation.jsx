import { MdWindow } from "react-icons/md";
import { MdMovie } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import { BsBookmarkFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navigation.module.css";

const AppNav = () => {
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
        <img src="imgs/nav.jpg" alt="Account profile" />
      </NavLink>
    </nav>
  );
};
export default AppNav;
