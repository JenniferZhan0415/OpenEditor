import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Documents } from "../../pages/documents/Documents";

import { Link } from "react-router-dom";
import "./Signup.scss";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { setDocuments } from "../../store/documentsSlice";

export default function Signup() {
  const formRef = useRef();
  const [idArray, setIdArray] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseUrl = "http://localhost:5231";
  const signupUrl = `${baseUrl}/signup`;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(formRef.current.username);
      await axios.post(signupUrl, {
        username: formRef.current.username.value,
        password: formRef.current.password.value,
      });
      console.log("successfully signed up");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  // const username =
  // const userpassword =

  // if (userpassword == password) {
  //   const getdocuments = async () => {
  //     const response = await axios.get(
  //       `http://localhost:5231/login/${email}`
  //     );
  //     const array = response.data;
  //     setIdArray(array);

  //     dispatch(setDocuments(array));
  //     navigate("/documents");
  //   };

  //   getdocuments();
  // } else {
  //   alert("Incorrect Password");
  // }
  //   };
  return (
    <>
      <section className="login">
        <Header />
        <form className={`form`} onSubmit={handleSignup} ref={formRef}>
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
              Sign up
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
