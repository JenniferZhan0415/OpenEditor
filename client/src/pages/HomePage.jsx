import { Link } from "react-router-dom";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <>
      <section className="home">
        <div className="home__version-box">
          <p className="home__version">v1.0.0</p>
          <h1 className="home__title">Welcome to OpenEditor!</h1>
        </div>

        <Link to={"/login"}>
          <button className="home__button">Log in</button>
          <button className="home__button">Sign up</button>
        </Link>
        <ul className="home__content">
          <li className="home__text">Contributed by:</li>
          <li className="home__text"> Anjali Devi</li>
          <li className="home__text"> Jennifer Zhan</li>
        </ul>
      </section>
    </>
  );
}
