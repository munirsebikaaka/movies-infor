import { useState } from "react";
import styles from "../styles/profiles.module.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import isUpperCaseAdded from "../services/passwordCheck/upperCase";
import isLowerCaseAdded from "../services/passwordCheck/lowerCase";
import isNumbersAdded from "../services/passwordCheck/numbers";
import isSymbolsAdded from "../services/passwordCheck/symbols";

export default function ChangePassword({ setShowChangePasswordForm }) {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [oldMsg, setOldMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [repeatMsg, setRepeatMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const accountID = localStorage.getItem("accountID");
    const savedPassword = accounts
      .filter((el) => el.accountID === accountID)
      .map((el) => el.password)
      .join("");

    if (values.oldPassword.length < 1)
      return setOldMsg("Please input old password! ");
    setOldMsg("");
    if (values.oldPassword !== savedPassword)
      return setOldMsg("Wrong password!");
    setOldMsg("");
    if (values.newPassword.length < 1)
      return setNewMsg("Please input new password!");
    setNewMsg("");
    if (values.newPassword.length < 6)
      return setNewMsg("New password must atleast has 6 digits!");
    setNewMsg("");
    if (!isUpperCaseAdded(values.newPassword))
      return setNewMsg("Please include atleast one capital letter.");
    setNewMsg("");
    if (!isLowerCaseAdded(values.newPassword))
      return setNewMsg("Please include atleast one small letter.");
    setNewMsg("");
    if (!isNumbersAdded(values.newPassword))
      return setNewMsg("Please include atleast one digit.");
    setNewMsg("");
    if (!isSymbolsAdded(values.newPassword))
      return setNewMsg("Please include atleast one symbol.");
    setNewMsg("");
    if (values.repeatPassword.length < 1)
      return setRepeatMsg("Please repeat password!");
    setRepeatMsg("");
    if (values.newPassword !== values.repeatPassword)
      return setRepeatMsg("Password doesn't much!");
    const updatedAccount = accounts.map((el) => {
      if (el.accountID === accountID) {
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
        <p className={styles.passwordError}>{oldMsg}</p>
        <p className={styles.passwordError2}>{newMsg}</p>
        <p className={styles.passwordError3}>{repeatMsg}</p>
        <br />
        <div className={styles.aboutPassword}>
          <label>old password</label>
          <br />
          <input
            style={
              oldMsg.length > 0
                ? { border: "1px solid  #fc4747" }
                : { border: "1px solid  #5a698f" }
            }
            type={!showPassword2 ? "password" : "text"}
            placeholder="old password"
            name="oldPassword"
            onChange={handleChange}
            value={values.oldPassword}
          />
          <br />
          <label>new password</label>
          <br />
          <input
            style={
              newMsg.length > 0
                ? { border: "1px solid  #fc4747" }
                : { border: "1px solid  #5a698f" }
            }
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
            style={
              repeatMsg.length > 0
                ? { border: "1px solid  #fc4747" }
                : { border: "1px solid  #5a698f" }
            }
            type={showPassword3 ? "text" : "password"}
            placeholder="repeat password"
            name="repeatPassword"
            onChange={handleChange}
            value={values.repeatPassword}
          />
        </div>
        <button type="submit" className={styles.submit}>
          update password
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
        {!showPassword2 ? (
          <IoEye
            className={styles.profileEye2}
            onClick={() => setShowPassword2(true)}
          />
        ) : (
          <IoEyeOff
            className={styles.profileEye2}
            onClick={() => setShowPassword2(false)}
          />
        )}
        {!showPassword3 ? (
          <IoEye
            className={styles.profileEye3}
            onClick={() => setShowPassword3(true)}
          />
        ) : (
          <IoEyeOff
            className={styles.profileEye3}
            onClick={() => setShowPassword3(false)}
          />
        )}
      </form>
    </>
  );
}
