import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Payment({}: Props) {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);

  const navigate = useNavigate();

  const [patientList, setPatientList] = useState([]);

  async function SearchClick() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getPatientPayment/${searching}`
      );
      console.log(response.data);
      setPatientList(response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  }

  const makePayment = async (p_id) => {
    console.log(p_id);
    const date = new Date().toISOString().split("T")[0];
    try {
      const response = await axios.post(
        `http://localhost:3000/api/makePayment`,
        { p_id, date }
      );
      console.log(response.data);
      alert(response.data);
      setSearching("");
      setUpdateFlag(!updateFlag);
      SearchClick();
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };
  useEffect(() => {
    SearchClick();
  }, [updateFlag]);
  return (
    <>
      <div>
        <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-900 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="card mx-auto my-3 w-4/6 py-3 bg-white dark:bg-gray-800 relative sm:rounded-lg">
                <div className="input w-4/6 input-bordered flex items-center mx-auto gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={searching}
                    onChange={(e) => setSearching(e.target.value)}
                  />
                  <button
                    className="btn bg-blue-500 w-16 text-xs text-white mx-2"
                    onClick={SearchClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <table className="table table-xs">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      ID card
                    </th>
                    <th scope="col" className="p-4">
                      FirstName
                    </th>
                    <th scope="col" className="p-4">
                      MiddleName
                    </th>
                    <th scope="col" className="p-4">
                      LastName
                    </th>
                    <th scope="col" className="p-4">
                      Phone Number
                    </th>
                    <th scope="col" className="p-4">
                      view
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patientList.map((val) => (
                    <tr
                      key={val.p_id}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <th>{val.idNumber}</th>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.fName}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.mName ? val.mName : "-"}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.lName}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.tel}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center space-x-4">
                          <button
                            className="btn btn-outline btn-accent"
                            onClick={() =>
                              document.getElementById(val.p_id).showModal()
                            }
                          >
                            Pay
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {patientList.map((val) => (
                <dialog
                  id={val.p_id}
                  className="modal"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Name: {val.fName} {val.mName} {val.lName}
                    </h3>
                    <div className="divider">Personal Information</div>
                    <h3 className="text-1xl">ID card : {val.idNumber}</h3>
                    <h3 className="text-1xl">Phone Number : {val.tel}</h3>
                    <div className="divider">Doctor</div>
                    <h3 className="text-1xl">
                      Name : {val.e_fName} {val.e_lName}
                    </h3>
                    <h3 className="text-1xl">
                      License ID : {val.d_license_id}
                    </h3>
                    <h3 className="text-1xl">
                      Department : {val.department_name}
                    </h3>
                    <div className="divider">Cure Information</div>
                    <h3 className="text-1xl">
                      Start Date :{" "}
                      {new Date(val.date_cure).toLocaleDateString()}
                    </h3>
                    <h3 className="text-1xl">
                      End Date :{" "}
                      {val.date_finished
                        ? new Date(val.date_finished).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </h3>
                    <h3 className="text-1xl">
                      Number of Day : {""}
                      {val.date_finished
                        ? val.days
                        : Math.floor(
                            (new Date().getTime() -
                              new Date(val.date_cure).getTime()) /
                              (1000 * 3600 * 24) +1
                          )}
                    </h3>
                    <h3 className="text-1xl">
                      Cost : {""}
                      {val.date_finished
                        ? val.cost
                        : Math.floor(
                            (new Date().getTime() -
                              new Date(val.date_cure).getTime()) /
                              (1000 * 3600 * 24)
                          +1) * 1000}
                    </h3>
                    <div>
                      <div className="modal-action">
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            makePayment(val.p_id);
                            document.getElementById(val.p_id).close();
                          }}
                        >
                          Pay
                        </button>
                        <button
                          className="btn"
                          onClick={() => {
                            document.getElementById(val.p_id).close();
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </dialog>
              ))}
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
