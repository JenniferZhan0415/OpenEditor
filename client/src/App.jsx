import "./App.scss";
import TextEditor from "./component/TextEditor/TextEditor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Templates from "./component/Templates/Templates";
import HomePage from "./pages/HomePage";
import { Documents } from "./pages/documents/Documents";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Profile from "./component/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/new"
            exact
            element={<Navigate to={`/documents/${uuidv4()}`} />}
          ></Route>
          <Route path="/documents/:id" element={<TextEditor />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
