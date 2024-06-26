import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DocEdit from "./components/pages/doctorInfo/docEditInfo/DocEditInfoPage.tsx";
import PatientInfo from "./components/pages/patientInfo/PatientInfoPage";
import CheckIn from "./components/pages/CheckIn";
import PatientInfoStaff from "./components/pages/patientInfo/PatientInfoPageForStaff.tsx";

import SearchPatientPage from "./components/pages/patientInfo/SearchPatientPage";
import MyProfile from "./components/pages/myProfile.tsx";
import ChangePassword from "./components/pages/changePassword.tsx";
import ClockInHistory from "./components/pages/reportAll/ClockInHistory.tsx";
import InsertCureHist from "./components/pages/patientInfo/CureEdit/CureInsert.tsx";
import UpdateCureHist from "./components/pages/patientInfo/CureEdit/CureUpdate.tsx";
import AllergyUpdate from "./components/pages/patientInfo/AllergyEdit/AllergyUpdate.tsx";
import AllergyInsert from "./components/pages/patientInfo/AllergyEdit/AllergyInsert.tsx";
import InsertPatient from "./components/pages/patientInfo/PatientEdit/InsertPatient.tsx";
import UpdatePatientInfo from "./components/pages/patientInfo/PatientEdit/UpdatePersonalInfo.tsx";
import ManagePatientPage from "./components/pages/patientInfo/ManagePatientPage.tsx";

import ManageDoctorPage from "./components/pages/doctorInfo/ManageDoctorPage.tsx";
import DoctorInfo from "./components/pages/doctorInfo/DoctorInfoPage.tsx";
import UpdateDoctorInfo from "./components/pages/doctorInfo/DoctorEdit/UpdatePersonalInfo.tsx";
import InsertDoctor from "./components/pages/doctorInfo/DoctorEdit/InsertDoctor.tsx";
import UpdateDocEducation from "./components/pages/doctorInfo/DoctorEdit/UpdateEducation.tsx";
import InsertDocEducation from "./components/pages/doctorInfo/DoctorEdit/InsertEducation.tsx";

import Income from "./components/pages/reportAll/Income.tsx";
import RoomBooking from "./components/pages/roomManage/RoomBooking";

import MonthlyIncome from "./components/pages/reportAll/MonthlyIncome.tsx";
import Payment from "./components/pages/payment/Payment.tsx";
import NumberOfCases from "./components/pages/reportAll/NumberOfCases.tsx";
import NumberOfStaff from "./components/pages/reportAll/NumberOfStaff.tsx";
import IncomeAll from "./components/pages/reportAll/IncomeAll.tsx";

import ManageStaffPage from "./components/pages/staffInfo/ManageStaffPage.tsx";
import StaffInfo from "./components/pages/staffInfo/StaffInfoPage.tsx";
import UpdateStaffInfo from "./components/pages/staffInfo/StaffEdit/UpdatePersonalInfo.tsx";
import InsertStaff from "./components/pages/staffInfo/StaffEdit/InsertStaff.tsx";
import UpdateStaffEducation from "./components/pages/staffInfo/StaffEdit/UpdateEducation.tsx";
import InsertStaffEducation from "./components/pages/staffInfo/StaffEdit/InsertEducation.tsx";

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
        <Route path="/doctorinfo/details/edit" element={<DocEdit />} />

        <Route path="/my_profile" element={<MyProfile />} />
        <Route
          path="/my_profile/change_password"
          element={<ChangePassword />}
        />
        <Route path="/search_patient/details" element={<PatientInfo />} />
        <Route path="/checkIn" element={<CheckIn />} />
        <Route path="/clockIn_history" element={<ClockInHistory />} />

        <Route path="/search_patient" element={<SearchPatientPage />} />
        <Route
          path="/search_patient/details/allergy_update"
          element={<AllergyUpdate />}
        />
        <Route
          path="/search_patient/details/allergy_insert"
          element={<AllergyInsert />}
        />
        <Route
          path="/search_patient/details/cure_insert"
          element={<InsertCureHist />}
        />
        <Route
          path="/search_patient/details/cure_update"
          element={<UpdateCureHist />}
        />

        <Route path="/manage_doctor" element={<ManageDoctorPage />} />
        <Route path="/manage_doctor/details" element={<DoctorInfo />} />
        <Route
          path="/manage_doctor/details/doctor_update"
          element={<UpdateDoctorInfo />}
        />
        <Route
          path="/manage_doctor/details/education_update"
          element={<UpdateDocEducation />}
        />
        <Route
          path="/manage_doctor/details/education_insert"
          element={<InsertDocEducation />}
        />

        <Route path="/income" element={<Income />} />
        <Route path="/monthly_income" element={<MonthlyIncome />} />
        <Route path="/roomBooking" element={<RoomBooking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/manage_doctor/doctor_insert" element={<InsertDoctor />} />
        <Route path="/cases_report" element={<NumberOfCases />} />
        <Route path="/staff_report" element={<NumberOfStaff />} />
        <Route path="/income_all" element={<IncomeAll />} />

        <Route path="/manage_staff" element={<ManageStaffPage />} />
        <Route path="/manage_staff/details" element={<StaffInfo />} />
        <Route path="/manage_staff/staff_insert" element={<InsertStaff />} />
        <Route
          path="/manage_staff/details/staff_update"
          element={<UpdateStaffInfo />}
        />
        <Route
          path="/manage_staff/details/education_update"
          element={<UpdateStaffEducation />}
        />
        <Route
          path="/manage_staff/details/education_insert"
          element={<InsertStaffEducation />}
        />

        <Route path="/manage_patient" element={<ManagePatientPage />} />
        <Route path="/manage_patient/details" element={<PatientInfoStaff />} />
        <Route
          path="/manage_patient/details/patient_update"
          element={<UpdatePatientInfo />}
        />
        <Route
          path="/manage_patient/patient_insert"
          element={<InsertPatient />}
        />
      </Routes>
    </>
  );
}

export default App;
