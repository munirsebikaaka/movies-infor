import { useState } from "react";
import styles from "../styles/profiles.module.css";

export default function ChangePassword({ logedInEmail }) {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onsubmitHandler = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const savedPassword = accounts
      .filter((el) => el.email === logedInEmail)
      .map((el) => el.password)
      .join("");
    console.log("saved password", savedPassword);

    if (values.oldPassword.length < 1)
      return alert("Please input old password ");
    if (values.oldPassword !== savedPassword) return alert("Wrong password");
    if (values.newPassword.length < 4)
      return alert("New password must atleast has 4 digits");
    if (values.repeatPassword.length < 1)
      return alert("Please repeat password");
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
  };
  return (
    <form className={styles.passwordsCell} onSubmit={onsubmitHandler}>
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
          type="password"
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
      <button type="submit" className={styles.btn}>
        submit
      </button>
    </form>
  );
}
