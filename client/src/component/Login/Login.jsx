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
  const password = "1234";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formRef.current.email.value;
    const userpassword = formRef.current.password.value;

    if (userpassword == password) {
      const getdocuments = async () => {
        const response = await axios.get(
          `http://localhost:5231/login/${email}`
        );
        const array = response.data;
        setIdArray(array);

        dispatch(setDocuments(array));
        navigate("/documents");
      };

      getdocuments();
    } else {
      alert("Incorrect Password");
    }
  };
  return (
    <>
      <section className="login">
        <Header />
        <form className={`form `} onSubmit={handleSubmit} ref={formRef}>
          <h2 className="form__title">Welcome back!</h2>
          <label className="form__label" htmlFor="email">
            Email:{" "}
          </label>
          <input
            className="form__input"
            type="email"
            name="email"
            id="email"
            required
            placeholder="student@brainstaion.com"
          />
          <label className="form__label" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
            required
          />
          <div className="form__button-box">
            <button className="form__button">Log In</button>

            <button className="form__button">Cancel</button>
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
