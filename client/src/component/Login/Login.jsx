import { useRef } from "react";
import axios from "axios";

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
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button>Log In</button>
      </form>
    </>
  );
}
