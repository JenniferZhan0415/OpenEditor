import "./Templates.scss";
import NewFileImage from "../../assets/images/empty.png";
import ResumeImage from "../../assets/images/resume.png";
import TravelPlanImage from "../../assets/images/travel.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Templates() {
  const ChangeTemplate = async (template) => {
    try {
      const response = await axios.get(
        `http://localhost:5173/template/${template}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="template">
        <div>
          <Link to={"/"}>
            <img
              className="template__image"
              src={NewFileImage}
              alt="create a new empty file image"
            />
          </Link>
        </div>
        <div>
          <Link to={`/documents/${uuidv4()}?template=resume`}>
            <img
              className="template__image"
              src={ResumeImage}
              alt="create a pet resume file image"
            />
          </Link>
        </div>
        <div>
          <Link to={`/documents/${uuidv4()}?template=travel`}>
            <img
              onClick={() => ChangeTemplate("travel")}
              className="template__image"
              src={TravelPlanImage}
              alt="create a travel plan file image"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
