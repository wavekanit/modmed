import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import StaffRegisPage from "./components/pages/StaffRegisPage";

function App() {
  // localStorage.setItem("abc", "jwtjwt");
  // console.log(localStorage.getItem('abc'))
  // localStorage.removeItem("abc");
  // useEffect(() => {
  //   const result = axios
  //     .get("https://66196f5f125e9bb9f299fd65.mockapi.io/user")
  //     .then((result) => {
  //       console.log(result);
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  //   console.log(1);
  // }, []);

  return (
    <>
      {/* <button
        onClick={async () => {
          try {
            const result = await axios.get(
              "https://66196f5f125e9bb9f299fd65.mockapi.io/user"
            );
            console.log(result);
            console.log(1);
          } catch (error) {
            console.log(error);
          }
        }}
      ></button> */}
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<StaffRegisPage />} />
      </Routes>
    </>
  );
}

export default App;
