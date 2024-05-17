import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import StaffRegisPage from "./components/pages/docRegisterPage/DocRegisPage";
// import PatientRegisPage from "./components/pages/patientRegisterPage/PatientRegisPage";
// import CrudPage from "./components/pages/CrudPage";
// import AddInfo from "./components/pages/crudStep/AddInfoPage.tsx";
// import EditInfoPage from "./components/pages/crudStep/EditInfoPage.tsx";
import DocInfo from "./components/pages/docInfo/DoctorInfoPage.tsx";
import DocDetail from "./components/pages/docInfo/doctorDetailPage.tsx";
import DocEdit from "./components/pages/docEditInfo/DocEditInfoPage";
import PatientInfo from "./components/pages/patientInfo/PatientInfoPage";
import CheckIn from "./components/pages/CheckIn";
import AllergyUpdate from "./components/pages/patientInfo/AllergyEdit/AllergyUpdate.tsx";
import SearchPatientPage from "./components/pages/patientInfo/SearchPatientPage";
import MyProfile from "./components/pages/myProfile.tsx";
import ClockInHistory from "./components/pages/ClockInHistory.tsx"
import InsertCureHist from "./components/pages/patientInfo/CureInsert/CureInsert.tsx";

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
        <Route path="/add_doctor" element={<StaffRegisPage />} />
        {/* <Route path = "/add_patient" element={<PatientRegisPage />} /> */}
        {/* <Route path = "/crud" element={<CrudPage />} />
        <Route path = "/Add" element={<AddInfo />} />
        <Route path = "/Edit" element={<EditInfoPage />} /> */}
        <Route path="/manage_doctor" element={<DocInfo />} />
        <Route path="/manage_doctor/details" element={<DocDetail />} />
        <Route path="/manage_doctor/details/edit" element={<DocEdit />} />
        {/* <Route path = "manage_patient" element = {<CrudPage />} /> */}
        {/* <Route path = "/doctorinfo" element = {<DocInfo/>}/> */}
        {/* <Route path = "/doctorinfo/details" element = {<DocDetail/>}/> */}
        {/* <Route path = "/doctorinfo/details/edit" element = {<DocEdit/>}/> */}
        <Route path = "/search_patient" element = {<SearchPatientPage />} />
        <Route path = "/doctorinfo/details" element = {<DocDetail/>}/>
        <Route path = "/doctorinfo/details/edit" element = {<DocEdit/>}/>
        {/* <Route path="manage_doctor" element={<CrudPage />} />
        <Route path="manage_patient" element={<CrudPage />} /> */}
        <Route path="/my_profile" element={<MyProfile />} />
        <Route path="/search_patient/details" element={<PatientInfo />} />
        <Route path="/checkIn" element={<CheckIn />} />
        <Route path="/clockIn_history" element={<ClockInHistory />} />
        <Route path="/search_patient/details/allergy_update" element={<AllergyUpdate />} />
        <Route path="/search_patient/details/cure_insert" element={<InsertCureHist />} />
      </Routes>
    </>
  );
}

export default App;
