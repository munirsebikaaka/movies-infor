import { useEffect, useState } from "react";
import styles from "../styles/profiles.module.css";
import ChangePassword from "./changePasswordForm";
import { IoArrowBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { logedInEmail } from "../services/bookmarksArr";

const AboutAccount = () => {
  const [firstLetters, setFirstLetters] = useState("");
  const [lastLetters, setLastLetters] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const accountID = localStorage.getItem("accountID");
    const firsLetterName = accounts
      .filter((el) => el.id === accountID)
      .map((el) => el.firstName)
      .join("");
    setFirstLetters(firsLetterName);
    const lastLetterName = accounts
      .filter((el) => el.id === accountID)
      .map((el) => el.lastName)
      .join("");
    setLastLetters(lastLetterName);
    console.log(firsLetterName);
    console.log(lastLetterName);
  }, []);

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const accountID = localStorage.getItem("accountID");
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountID) {
        return {
          ...account,
          firstName: values.firstName,
          lastName: values.lastName,
        };
      }
      return account;
    });
    localStorage.setItem("acounts", JSON.stringify(updatedAccounts));
    setValues({
      firstName: "",
      lastName: "",
    });
  };

  const uploadPhotoTrigger = () => {
    const imageInput = document.getElementById("uploadImage");
    imageInput.click();
  };
  // const uploadPhotoHandler = (e) => {
  //   const ImgObj = e.target.files[0];
  //   const url = URL.createObjectURL(ImgObj);
  //   localStorage.setItem("profilePic", url);
  //   setValues({ ...values, image: url });
  // };

  const uploadPhotoHandler = (e) => {
    const ImgObj = e.target.files;
    if (ImgObj && ImgObj[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageDataUrl = event.target.result;
        localStorage.setItem("profilePic", imageDataUrl);
        const profilePic = localStorage.getItem("profilePic");
        // setValues({ ...values, image: profilePic });
        setValues((prev) => ({ ...prev, image: profilePic }));
      };
      reader.readAsDataURL(ImgObj[0]);
    }
  };

  const profileLength = values.image?.length;

  return (
    <div className={styles.profile}>
      <div className={styles.profileBody}>
        <NavLink className={styles.backHome} to={"/"}>
          <IoArrowBack />
        </NavLink>
        <h1>Account Profile</h1>
        <div>
          {!profileLength ? (
            <div className={styles.profilePic}>
              <h2>{firstLetters[0]?.toUpperCase()}</h2>
              <h2>{lastLetters[0]?.toUpperCase()}</h2>
            </div>
          ) : (
            <img
              className={styles.profileImg}
              src={values.image}
              alt="face of the user"
            />
          )}

          <input
            onChange={uploadPhotoHandler}
            style={{ display: "none" }}
            id="uploadImage"
            type="file"
            accept="image/*"
          />
          <br />
          <button onClick={uploadPhotoTrigger} className={styles.upload}>
            {values.image?.length ? "Change Profile " : "Upload Profile "}
          </button>
        </div>
        <form onSubmit={onsubmitHandler}>
          <div className={styles.namesEmail}>
            <div className={styles.names}>
              <div>
                <label className={styles.label}>First Name</label>
                <br />
                <input
                  type="text"
                  placeholder={firstLetters}
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div>
                <label>Last Name</label>
                <br />
                <input
                  name="lastName"
                  type="text"
                  placeholder={lastLetters}
                  onChange={handleChange}
                  value={values.lastName}
                />
              </div>
            </div>
            <div>
              <label>Email Address</label>
              <br />
              <input
                type="email"
                placeholder={logedInEmail}
                disabled
                className={styles.email}
              />
              <br />
              <button type="submit" className={styles.submit}>
                update names
              </button>
            </div>
          </div>
        </form>

        {showChangePasswordForm ? (
          <ChangePassword
            setShowChangePasswordForm={setShowChangePasswordForm}
          />
        ) : (
          <>
            <label>password</label>
            <br />
            <input
              className={styles.email}
              type="type"
              placeholder="........."
              disabled
            />
            <br />
            <button
              className={styles.changeaP}
              onClick={() => setShowChangePasswordForm(true)}
            >
              Change password
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default AboutAccount;
