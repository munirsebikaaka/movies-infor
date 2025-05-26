import { useEffect, useState } from "react";
import styles from "../styles/profiles.module.css";
import ChangePassword from "./changePasswordForm";
import { IoArrowBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { logedInEmail } from "../services/bookmarksArr";

const AboutAccount = () => {
  const [profilePic, setProfilePic] = useState("");
  const [userAccount, setUserAccount] = useState({});
  const [firstErr, setFirstErr] = useState("");
  const [lastErr, setLastErr] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const accountID = localStorage.getItem("accountID");
    const logedInUser = accounts?.find((ac) => ac.id === accountID);
    setUserAccount(logedInUser);
  }, []);
  const firstName = userAccount?.firstName;
  const lastName = userAccount?.lastName;

  const onsubmitHandler = (e) => {
    e.preventDefault();
    if (!values.firstName) return setFirstErr("Please input first name");
    setFirstErr("");
    if (!values.lastName) return setLastErr("Please input last name");
    setLastErr("");
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
    setUserAccount((account) => ({
      ...account,
      firstName: values.firstName,
      lastName: values.lastName,
    }));
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
  const uploadPhotoHandler = (e) => {
    const ImgObj = e.target.files[0];
    if (ImgObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgData = e.target.result;
        const accounts = JSON.parse(localStorage.getItem("acounts"));
        const accountID = localStorage.getItem("accountID");
        const updatedAccounts = accounts.map((account) => {
          if (account.id === accountID) {
            return { ...account, profilePic: imgData };
          }
          return account;
        });
        updatedAccounts.map(
          (el) => el.id === accountID && setProfilePic(el.profilePic)
        );
        localStorage.setItem("acounts", JSON.stringify(updatedAccounts));
      };
      reader.readAsDataURL(ImgObj);
    }
  };

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const accountID = localStorage.getItem("accountID");
    const logedInUser = accounts?.find((ac) => ac.id === accountID);
    if (logedInUser?.profilePic) {
      setProfilePic(logedInUser.profilePic);
    }
  }, []);

  const profileLength = profilePic?.length;

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
              <h2>{firstName && firstName[0]?.toUpperCase()}</h2>
              <h2>{lastName && lastName[0]?.toUpperCase()}</h2>
            </div>
          ) : (
            <img
              className={styles.profileImg}
              src={profilePic}
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
        <form onSubmit={onsubmitHandler} className={styles.accountForm}>
          <div className={styles.namesEmail}>
            <div className={styles.names}>
              <p className={styles.firstNameError}>{firstErr}</p>
              <p className={styles.lastNameError}>{lastErr}</p>
              <div>
                <label className={styles.label}>First Name</label>
                <br />
                <input
                  type="text"
                  placeholder={firstName}
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  style={
                    firstErr.length > 0
                      ? { border: "1px solid  #fc4747" }
                      : { border: "1px solid  #5a698f" }
                  }
                />
                <br />
              </div>
              <div>
                <label>Last Name</label>
                <br />
                <input
                  name="lastName"
                  type="text"
                  placeholder={lastName}
                  onChange={handleChange}
                  value={values.lastName}
                  style={
                    lastErr.length > 0
                      ? { border: "1px solid  #fc4747" }
                      : { border: "1px solid  #5a698f" }
                  }
                />
              </div>
            </div>
            <div>
              <label>Email Address</label>
              <br />
              <input
                type="email"
                value={userAccount.email}
                placeholder={logedInEmail}
                disabled
                className={styles.email}
              />
              <br />
              <div className={styles.submitBtn}>
                <button type="submit" className={styles.submit}>
                  update names
                </button>
              </div>
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
