import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function clockInStatus() {
  const id = localStorage.getItem("id");
  const [dummy_data, setDummyData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Start fetching data from API")
        const response = await axios.get('http://localhost:3000/api/getAttendance/' + id);
        console.log(response)
        setDummyData(response.data);
      }
      catch (error) {
        console.log("Error fetching data from API:", error);
      }
    }
    fetchData();
  }, [])

  const fName = JSON.parse(localStorage.getItem("fName") || '""');
  const lName = JSON.parse(localStorage.getItem("lName") || '""');

  return <>
    <h1 className="text-3xl font-bold text-center">Clock history for {fName} {lName}</h1>
    <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <table className="table table-xs">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {/* item */}
              <tr>
                <th scope="col" className="p-4">
                  Date
                </th>
                <th scope="col" className="p-4">
                  Clock-In
                </th>
                <th scope="col" className="p-4">
                  Clock-Out
                </th>
                <th scope="col" className="p-4">
                  Total Hours worked
                </th>
              </tr>
            </thead>
            <tbody>{dummy_data.map((item, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                {/* Data for each column */}
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <th>{new Date(item.clock_in).toLocaleDateString('en-GB')}</th>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <td>{new Date(item.clock_in).toLocaleTimeString('en-GB')}</td>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <td>{new Date(item.clock_out).toLocaleDateString('en-GB') === new Date(item.clock_in).toLocaleDateString('en-GB') ? "" : (new Date(item.clock_out).toLocaleDateString('en-GB'))} {new Date(item.clock_out).toLocaleTimeString('en-GB')}</td>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <td>{item.hours_work}</td>
                  </div>
                </td>
              </tr>

            ))}
            </tbody>
          </table>
        </div>
        <br />
      </div>
    </div>
  </>

}