import { useRef, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Documents } from "../../pages/documents/Documents";

import { Link } from "react-router-dom";
import "./Login.scss";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { setDocuments } from "../../store/documentsSlice";

export default function Login() {
  const formRef = useRef();
  const [idArray, setIdArray] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseUrl = "http://localhost:5231";
  const loginUrl = `${baseUrl}/login`;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({
      username: formRef.current.username.value,
      password: formRef.current.password.value,
    });
    try {
      const response = await axios.post(loginUrl, {
        username: formRef.current.username.value,
        password: formRef.current.password.value,
      });
      sessionStorage.setItem("JWTtoken", response.data.token);

      setIsLoggedIn(true);
      setIsLoginError(false);
      setErrorMessage("");
      console.log("successfully logged in");
      navigate("/documents");
    } catch (error) {
      setIsLoginError(true);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <section className="login">
        <Header />
        <form className={`form`} onSubmit={handleLogin} ref={formRef}>
          <h2 className="form__title">Welcome back!</h2>
          <label className="form__label" htmlFor="username">
            Username:{" "}
          </label>
          <input
            className="form__input"
            type="text"
            name="text"
            id="username"
            required
            placeholder="Enter your user name"
          />
          <label className="form__label" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <div className="form__button-box">
            <Link to={"/"}>
              <button className="form__button">Cancel</button>
            </Link>
            <button type="submit" className="form__button">
              Log In
            </button>
          </div>
        </form>
      </section>
      {/* {console.log(idArray.length)}
      {isSubmitted !== false && (
        <>{idArray.length > 0 && <>{<Documents idArray={idArray} />}</>}</>
      )} */}
    </>
  );
}
