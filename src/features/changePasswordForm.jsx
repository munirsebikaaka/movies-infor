import { useState } from "react";
import styles from "../styles/profiles.module.css";
import checkIfPasswordIsValid from "../services/passwordChecker";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { logedInEmail } from "../services/bookmarksArr";

export default function ChangePassword({ setShowChangePasswordForm }) {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [oldMsg, setOldMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [repeatMsg, setRepeatMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  // const logedInEmail = localStorage.getItem("email");

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const savedPassword = accounts
      .filter((el) => el.email === logedInEmail)
      .map((el) => el.password)
      .join("");

    if (values.oldPassword.length < 1)
      return setOldMsg("Please input old password ");
    setOldMsg("");
    if (values.oldPassword !== savedPassword)
      return setOldMsg("Wrong password");
    setOldMsg("");
    if (values.newPassword.length < 6)
      return setNewMsg("New password must atleast has 6 digits");
    setNewMsg("");
    // if (!checkIfPasswordIsValid(values.newPassword))
    //   return setNewMsg("password is not strong");
    // setNewMsg("");
    if (values.repeatPassword.length < 1)
      return setRepeatMsg("Please repeat password");
    setRepeatMsg("");
    if (values.newPassword !== values.repeatPassword)
      return alert("Password doesn't much");
    const updatedAccount = accounts.map((el) => {
      if (el.email === logedInEmail) {
        return { ...el, password: values.newPassword };
      }
      return el;
    });
    localStorage.setItem("acounts", JSON.stringify(updatedAccount));
    setValues({
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    });
    setShowChangePasswordForm(false);
  };
  return (
    <>
      <form className={styles.passwordsCell} onSubmit={onsubmitHandler}>
        <p style={{ color: "wheat" }}>{oldMsg}</p>
        <p style={{ color: "wheat" }}>{newMsg}</p>
        <p style={{ color: "wheat" }}>{repeatMsg}</p>
        <br />
        <div className={styles.aboutPassword}>
          <label>old password</label>
          <br />
          <input
            type="password"
            placeholder="old password"
            name="oldPassword"
            onChange={handleChange}
            value={values.oldPassword}
          />
          <br />
          <label>new password</label>
          <br />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="new password"
            name="newPassword"
            onChange={handleChange}
            value={values.newPassword}
          />
          <br />
          <label>Comfirm new password</label>
          <br />
          <input
            type="password"
            placeholder="repeat password"
            name="repeatPassword"
            onChange={handleChange}
            value={values.repeatPassword}
          />
        </div>
        <button type="submit" className={styles.submit}>
          submit
        </button>
        {!showPassword ? (
          <IoEye
            className={styles.profileEye}
            onClick={() => setShowPassword(true)}
          />
        ) : (
          <IoEyeOff
            className={styles.profileEye}
            onClick={() => setShowPassword(false)}
          />
        )}
      </form>
    </>
  );
}
