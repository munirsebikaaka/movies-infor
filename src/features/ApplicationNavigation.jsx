import { MdWindow } from "react-icons/md";
import { MdMovie } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import { BsBookmarkFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navigation.module.css";
import { useEffect, useState } from "react";

const AppNav = () => {
  const [firstLetters, setFirstLetters] = useState("");
  const [lastLetters, setLastLetters] = useState("");
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const accountID = localStorage.getItem("accountID");

    const logedInUser = accounts?.find((ac) => ac.id === accountID);
    const firstLetterName = logedInUser?.firstName.split("");
    const lastLetterName = logedInUser?.lastName.split("");
    setFirstLetters(firstLetterName);
    setLastLetters(lastLetterName);
  }, []);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const accountID = localStorage.getItem("accountID");
    accounts.map((el) => el.id === accountID && setProfilePic(el.profilePic));
  }, []);

  const profileLength = profilePic?.length;

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
        {profileLength ? (
          <img src={profilePic} alt="Account profile" />
        ) : (
          <div className={styles.profilePic}>
            <h2>{firstLetters && firstLetters[0]}</h2>
            <h2>{lastLetters && lastLetters[0]}</h2>
          </div>
        )}
      </NavLink>
    </nav>
  );
};
export default AppNav;
