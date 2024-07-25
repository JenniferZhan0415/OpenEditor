import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.scss";
import Header from "../Header/Header";

export default function Login() {
  const formRef = useRef();
  const password = "1234";
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formRef.current.email.value;
    const userpassword = formRef.current.password.value;
    console.log(email, userpassword);

    if (userpassword == password) {
      const getdocuments = async () => {
        const response = await axios.get(
          `http://localhost:5231/login/${email}`
        );
        console.log(response.data);
      };
      getdocuments();
    }
  };
  return (
    <>
      <section className="login">
        {/* <h1 className="header-title">OpenEditor</h1> */}
        <Header />
        <form className="form" onSubmit={handleSubmit} ref={formRef}>
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
            <Link to={"/template"}>
              <button className="form__button">Log In</button>
            </Link>
            <Link to={"/home"}>
              <button className="form__button">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
