import { useState } from "react";
import { MdMovie } from "react-icons/md";
import styles from "../styles/Login.module.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { logedInEmail } from "../services/bookmarksArr";
const Login = ({ setToggleRegstration, setShowA, setLogedInEmail }) => {
  const [passwordMsg, setPasswordMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const createdAcounts = JSON.parse(localStorage.getItem("acounts"));
    const logedInUser = createdAcounts?.find((ac) => ac.email === values.email);
    if (!values.email) return setEmailMsg("Please input email address.");
    setEmailMsg("");
    if (!values.password) return setPasswordMsg("Please input password!");
    setPasswordMsg("");
    if (logedInUser.email !== values.email)
      return setEmailMsg("Invalid email!");
    if (logedInUser.password !== values.password)
      return setPasswordMsg("Wrong password!");
    setPasswordMsg("");
    if (logedInUser && logedInUser.password === values.password) {
      localStorage.setItem("email", values.email);
      setLogedInEmail(values.email);
      setShowA(true);
      setValues({
        email: "",
        password: "",
      });
      return;
    }
  };

  return (
    <>
      {
        <div className={styles.login}>
          <p className={styles.iconCell}>
            <MdMovie className={styles.icons} />
          </p>

          <form onSubmit={onsubmitHandler}>
            <p className={styles.erorr2}>{emailMsg}</p>
            <p className={styles.erorr}>{passwordMsg}</p>
            <h1>Login</h1>
            <input
              name="email"
              placeholder="Email Address"
              type="email"
              value={values.email}
              onChange={handleChange}
              style={
                emailMsg.length > 0
                  ? { borderBottom: "1px solid  #fc4747" }
                  : values.email.length >= 1
                  ? { borderBottom: "1.5px solid  #fff" }
                  : { borderBottom: "1px solid  #5a698f" }
              }
            />

            <br />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              style={
                passwordMsg.length > 0
                  ? { borderBottom: "1px solid  #fc4747" }
                  : values.password.length >= 1
                  ? { borderBottom: "1.5px solid  #fff" }
                  : { borderBottom: "1px solid  #5a698f" }
              }
            />
            <br />
            <button type="submit" className={styles.btnLogin}>
              Login to your account
            </button>
            <p>
              Don’t have an acount?
              <button
                onClick={() => setToggleRegstration(true)}
                className={styles.sign}
              >
                Sign Up
              </button>
            </p>
            {!showPassword ? (
              <IoEye
                className={styles.loginEye}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoEyeOff
                className={styles.loginEye}
                onClick={() => setShowPassword(false)}
              />
            )}
          </form>
        </div>
      }
    </>
  );
};
export default Login;
