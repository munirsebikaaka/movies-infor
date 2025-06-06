import { useState } from "react";
import { MdMovie } from "react-icons/md";
import { IoCloseSharp, IoEye, IoEyeOff } from "react-icons/io5";

import styles from "../styles/Login.module.css";
import isUpperCaseAdded from "../services/passwordCheck/upperCase";
import isLowerCaseAdded from "../services/passwordCheck/lowerCase";
import isNumbersAdded from "../services/passwordCheck/numbers";
import isSymbolsAdded from "../services/passwordCheck/symbols";
import { IoMdCheckmark } from "react-icons/io";
const SignIn = ({ setToggleRegstration }) => {
  const [firstMsg, setFirstMsg] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [rePasswordMsg, setRePasswordMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const isPasswordLengthOk = values.password.length >= 6;
  const isPasswordValid =
    isUpperCaseAdded(values.password) &&
    isLowerCaseAdded(values.password) &&
    isNumbersAdded(values.password) &&
    isSymbolsAdded(values.password) &&
    isPasswordLengthOk;

  const onsubmitHandler = (e) => {
    e.preventDefault();
    if (!values.firstName) return setFirstMsg("Can't be empty! ");
    setFirstMsg("");
    if (!values.lastName) return setLastMsg("Can't be empty!");
    setLastMsg("");
    if (!values.email) return setEmailMsg("Please input email address.");
    setEmailMsg("");
    if (!values.password) return setPasswordMsg("Can't be empty!");
    if (!isPasswordValid) return setPasswordMsg("Invalid password!");
    setPasswordMsg("");
    if (!rePassword) return setRePasswordMsg("Repeat password!");
    setRePasswordMsg("");

    if (values.password !== rePassword)
      return setRePasswordMsg("Doesn't match!");
    setRePasswordMsg("");
    setValues({ firstName: "", lastName: "", email: "", password: "" });
    setRePassword("");
    let acounts = [];
    acounts = JSON.parse(localStorage.getItem("acounts") || "[]");
    const acount = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      id: `256${values.email}${Math.random() * 10}${new Date().toISOString()}`,
    };
    acounts.push(acount);
    localStorage.setItem("acounts", JSON.stringify(acounts));
    setToggleRegstration(false);
  };

  return (
    <>
      <div className={styles.login}>
        <p className={styles.iconCell}>
          <MdMovie className={styles.icons} />
        </p>
        <form onSubmit={onsubmitHandler}>
          <p className={styles.nameError}>{firstMsg}</p>
          <p className={styles.nameError1}>{lastMsg}</p>
          <p className={styles.erorr1}>{emailMsg}</p>
          <p className={styles.erorr4}>{passwordMsg}</p>
          <p className={styles.rePass}>{rePasswordMsg}</p>
          <h1>Sign Up</h1>
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            value={values.firstName}
            onChange={handleChanges}
            style={
              firstMsg.length > 0
                ? { borderBottom: "1px solid  #fc4747" }
                : values.firstName.length >= 1
                ? { borderBottom: "1.5px solid  #fff" }
                : { borderBottom: "1px solid  #5a698f" }
            }
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            value={values.lastName}
            onChange={handleChanges}
            style={
              lastMsg.length > 0
                ? { borderBottom: "1px solid  #fc4747" }
                : values.lastName.length >= 1
                ? { borderBottom: "1.5px solid  #fff" }
                : { borderBottom: "1px solid  #5a698f" }
            }
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={values.email}
            onChange={handleChanges}
            style={
              emailMsg.length > 0
                ? { borderBottom: "1px solid  #fc4747" }
                : values.email.length >= 1
                ? { borderBottom: "1.5px solid  #fff" }
                : { borderBottom: "1px solid  #5a698f" }
            }
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={values.password}
            onChange={handleChanges}
            style={
              passwordMsg.length > 0
                ? { borderBottom: "1px solid  #fc4747" }
                : values.password.length >= 1
                ? { borderBottom: "1.5px solid  #fff" }
                : { borderBottom: "1px solid  #5a698f" }
            }
          />
          <div className={styles.passwordCheck}>
            <div>
              <p className={styles.check}>
                {isUpperCaseAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                )}
                one capital letter
              </p>
              <p className={styles.check}>
                {isLowerCaseAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                )}
                one small letter
              </p>
              <p className={styles.check}>
                {isLowerCaseAdded(values.password) &&
                isUpperCaseAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                )}
                only Latin letters
              </p>
            </div>
            <div>
              <p className={styles.check}>
                {isNumbersAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                )}{" "}
                one digit
              </p>
              <p className={styles.check}>
                {isSymbolsAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                )}
                one symbol
              </p>
              <p className={styles.check}>
                {isPasswordLengthOk ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                )}
                use 6 or more
              </p>
            </div>
          </div>
          <input
            name="repeatPassword"
            type={!showRepeat ? "password" : "text"}
            placeholder="Repeat password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            style={
              rePasswordMsg.length > 0
                ? { borderBottom: "1px solid  #fc4747" }
                : rePassword.length >= 1
                ? { borderBottom: "1.5px solid  #fff" }
                : { borderBottom: "1px solid  #5a698f" }
            }
          />
          <button className={styles.enter}>Create an account</button>
          <p className={styles.signUp}>
            Already have an account?
            <button
              onClick={() => setToggleRegstration(false)}
              className={styles.sign}
            >
              Login
            </button>
          </p>
          {!showPassword ? (
            <IoEye
              className={styles.signUpEye}
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <IoEyeOff
              className={styles.signUpEye}
              onClick={() => setShowPassword(false)}
            />
          )}

          {!showRepeat ? (
            <IoEye
              className={styles.Repeat}
              onClick={() => setShowRepeat(true)}
            />
          ) : (
            <IoEyeOff
              className={styles.Repeat}
              onClick={() => setShowRepeat(false)}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default SignIn;
