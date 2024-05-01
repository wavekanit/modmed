import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import StaffRegisPage from "./components/pages/DocRegisPage";
import PatientRegisPage from "./components/pages/PatientRegisPage";
import CrudPage from "./components/pages/CrudPage";
import AddInfo from "./components/pages/crudStep/AddInfoPage.tsx";
import EditInfoPage from "./components/pages/crudStep/EditInfoPage.tsx";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === null) {
    localStorage.setItem("isLoggedIn", "false");
  }

  return (
    <>
      <Nav />
      <Routes>
        {/* add roff */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<StaffRegisPage />} />
        <Route path="/patient" element={<PatientRegisPage />} />
        <Route path="/crud" element={<CrudPage />} />
        <Route path="/Add" element={<AddInfo />} />
        <Route path="/Edit" element={<EditInfoPage />} />
      </Routes>
    </>
  );
}

export default App;
