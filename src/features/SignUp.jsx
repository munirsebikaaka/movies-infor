import React from "react";
import { useState } from "react";
import { MdMovie } from "react-icons/md";
import styles from "../styles/Login.module.css";
import { ToastContainer, toast } from "react-toastify";

const SignIn = ({ setToggleRegstration, setShowA }) => {
  const [emailMsg, setEmailMsg] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [rePasswordMsg, setRePasswordMsg] = useState("");
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

  const nums = "1234567890".split("");
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYX".split("");
  const lower = "abcdefghijklmnopqrstuvwxyz".split("");
  const symboles = '!@#$%^&*()<>>?":|.,'.split("");
  const results = "aOdc".split("");
  const checkIfPasswordIsValid = () => {
    const final = results.filter(
      (el) => lower.includes(el) && upper.includes(el)
    );
    console.log(final);
  };
  checkIfPasswordIsValid();

  const onsubmitHandler = (e) => {
    e.preventDefault();
    if (!values.firstName) return;
    if (!values.lastName) return;
    if (!values.email) return setEmailMsg("Please input email address.");
    setEmailMsg("");
    if (!values.password) return setPasswordMsg("Can't be empty!");
    setPasswordMsg("");
    if (values.password.length < 4)
      return setPasswordMsg("Password must aleast have 4 characters.");
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
    };
    acounts.push(acount);
    localStorage.setItem("acounts", JSON.stringify(acounts));
    setToggleRegstration(false);
    toast("Click the login button below to login!");
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className={styles.login}>
        <p className={styles.iconCell}>
          <MdMovie className={styles.icons} />
        </p>
        <form onSubmit={onsubmitHandler}>
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
              emailMsg.length > 0
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
              emailMsg.length > 0
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
            type="password"
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
          <input
            name="repeatPassword"
            type="password"
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
          <p>
            Already have an account?
            <button
              onClick={() => setToggleRegstration(false)}
              className={styles.sign}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignIn;
