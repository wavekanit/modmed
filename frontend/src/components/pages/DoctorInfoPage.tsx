// docinfo page

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorInfoPage() {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");

  // const fetchAPI = async () => {
  //   const res = await axios.get("http://localhost:3000/docinfo");
  //   setData(res.data);
  // };
  //console.log(data);

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  const dummy_data = [
    {
      d_id: 1,
      fName: "John",
      mName: "Doe",
      lName: "Smith",
      bloodType: "A",
      sex: "Male",
      address: "1234 Main St, Springfield, IL 62701",
      tel: "217-555-1234",
      nationality: "American",
      idNumber: "1234567890"
    },
    {
      d_id: 2,
      fName: "Jane",
      mName: "Doe",
      lName: "Smith",
      bloodType: "B",
      sex: "Female",
      address: "1234 Main St, Springfield, IL 62701",
      tel: "200-555-1234",
      nationality: "American",
      idNumber: "0987654321"
    }
]
  // console.log(dummy_data);

  const navigate = useNavigate();

  function detailClick(val) {
    navigate("/doctorinfo/details",{replace: true, state: {val}});
  }

  function AddClick() {
    navigate("/add_doctor");
  }

  function SearchClick() {
    console.log("Searching for: " + searching);
  }

  const buttonSign = ">";

  return (
    <div className="card mx-auto my-3 w-4/6 py-3 bg-gray-50 dark:bg-gray-900">
      <label className="input w-4/6 input-bordered flex items-center mx-auto gap-2">
        <input type="text" className="grow" placeholder="Search" value={searching} onChange={e => setSearching(e.target.value)} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
      </label>
      <button className="btn bg-blue-500 w-16 text-xs text-white mx-auto mt-2" onClick={SearchClick}>Search</button>
      <div className="card-body bg-gray-50 dark:bg-gray-900 overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>d_id</th>
              <th>Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Blood Type</th>
              <th>Sex</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dummy_data.map((val) => (
              <tr key={val.d_id}>
                <th>{val.d_id}</th>
                <td>{val.fName}</td>
                <td>{val.mName ? val.mName : "-"}</td>
                <td>{val.lName}</td>
                <td>{val.bloodType}</td>
                <td>{val.sex}</td>
                <td>
                  <button
                    className="btn btn-ghost btn-xs"
                    type="button"
                    onClick={() => detailClick(val)}
                  >
                    {buttonSign}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>d_id</th>
              <th>Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Blood Type</th>
              <th>Sex</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <br />
      <div className="card-actions mx-auto">
        <button className="btn btn-md" onClick={AddClick}>Add</button>
      </div>
    </div>
  );
}
