import "./Profile.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:5231";
const profileUrl = `${baseUrl}/profile`;

export default function Profile({ setIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const token = sessionStorage.getItem("JWTtoken");
  const LogOut = () => {
    sessionStorage.removeItem("JWTtoken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setUserInfo({ name: response.data.username });
        // setUserInfo(response.data);
        console.log(response.data);
        console.log(userInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [token]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h1>Welcome {userInfo.name}!</h1>
      <button onClick={LogOut}>Log Out</button>
    </div>
  );
  // console.log(userInfo.name);
}
