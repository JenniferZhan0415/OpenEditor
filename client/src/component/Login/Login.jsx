import { useRef, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Documents } from "../../pages/documents/Documents";

export default function Login() {
  const formRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [idArray, setIdArray] = useState([]);
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
        const array = response.data;
        setIdArray(array);
        setIsSubmitted(true);
      };

      getdocuments();
      console.log(idArray);
    } else {
      alert("Incorrect Password");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button>Log In</button>
      </form>
      {console.log(idArray.length)}
      {isSubmitted !== false && (
        <>{idArray.length > 0 && <>{<Documents idArray={idArray} />}</>}</>
      )}
    </>
  );
}
