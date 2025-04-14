import { useEffect, useState } from "react";
import styles from "../styles/profiles.module.css";

const AboutAccount = () => {
  const [savedAccount, setSavedAccount] = useState([]);
  const [logedInAcc, setLogedInAcc] = useState([]);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
  });
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPasswod: "",
  });

  const savedEmail = logedInAcc?.map((el) => el.email).join("");
  const savedPassword = logedInAcc?.map((el) => el.password).join("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordValues({ ...passwordValues, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onsubmitChangeNamesHundler = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const updatedAccounts = accounts?.map((account) => {
      if (account.email === savedEmail) {
        return {
          ...account,
          firstName: values.firstName,
          lastName: values.lastName,
        };
      }
      return account;
    });
    localStorage.setItem("acounts", JSON.stringify(updatedAccounts));
  };

  const onsubmitChangePasswordHundler = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const updatedAccount = accounts.map((el) => {
      if (el.email === savedEmail) {
        return { ...el, password: passwordValues.newPassword };
      }
      return el;
    });
    localStorage.setItem("acounts", JSON.stringify(updatedAccount));
  };
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    setSavedAccount(accounts);
    const accountP = JSON.parse(localStorage.getItem("acountsP"));
    setLogedInAcc(accountP);
  }, []);

  const getFirsLetterName = () =>
    savedAccount
      .map((el) => el.firstName[0])
      .join("")
      .toUpperCase();
  const firstLetter = getFirsLetterName();

  const getLastLetterName = () =>
    savedAccount
      .map((el) => el.lastName[0])
      .join("")
      .toUpperCase();
  const lastLetter = getLastLetterName();

  return (
    <div className={styles.profile}>
      <div className={styles.profileBody}>
        <h1>Account Profile</h1>
        <div>
          <div className={styles.profilePic}>
            <h2>{firstLetter}</h2>
            <h2>{lastLetter}</h2>
          </div>
          <button>Upload photo</button>
        </div>
        <form onSubmit={onsubmitChangeNamesHundler}>
          <div className={styles.namesEmail}>
            <div className={styles.names}>
              <div>
                <label className={styles.label}>First Name</label>
                <br />
                <input
                  type="text"
                  placeholder="munir"
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
                  placeholder="codesmann"
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
                placeholder="munirsebikaaka@gmail.com"
                disabled
                className={styles.email}
              />
              <br />
              <button type="submit" className={styles.btn}>
                click
              </button>
            </div>
          </div>
        </form>
        <form
          className={styles.passwordsCell}
          onSubmit={onsubmitChangePasswordHundler}
        >
          <label>password</label>
          <br />
          <input type="password" placeholder="password" />
          <br />
          <button>Change password</button>
          <br />
          <div className={styles.aboutPassword}>
            <label>old password</label>
            <br />
            <input
              type="password"
              placeholder="old password"
              name="oldPassword"
              onChange={handlePasswordChange}
              value={passwordValues.oldPassword}
            />
            <br />
            <label>new password</label>
            <br />
            <input
              type="password"
              placeholder="new password"
              name="newPassword"
              onChange={handlePasswordChange}
              value={passwordValues.newPassword}
            />
            <br />
            <label>Comfirm new password</label>
            <br />
            <input
              type="password"
              placeholder="repeat password"
              name="repeatPassword"
              onChange={handleChange}
              value={passwordValues.repeatPasswod}
            />
          </div>
          <button type="submit" className={styles.btn}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AboutAccount;
