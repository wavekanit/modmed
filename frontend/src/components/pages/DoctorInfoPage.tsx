import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorInfoPage() {
  const [data, setData] = useState([]);

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
      sex: "Male"
    },
    {
      d_id: 2,
      fName: "Jane",
      mName: "Doe",
      lName: "Smith",
      bloodType: "B",
      sex: "Female"
    }
]
  console.log(dummy_data);

  const navigate = useNavigate();

  function detailClick(val) {
    navigate("/doctorinfo/details",{replace: true, state: {val}});
  }

  function AddClick() {
    navigate("/add_doctor");
  }

  const buttonSign = ">";

  return (
    <>
      <div className="overflow-x-auto">
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
      <div className="card-actions justify-center">
        <button className="btn btn-md" onClick={AddClick}>Add</button>
      </div>
    </>
  );
}
