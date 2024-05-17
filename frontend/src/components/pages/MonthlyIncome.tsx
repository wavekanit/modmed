import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MonthlyIncome() {
    const fName = JSON.parse(localStorage.getItem("fName") || '""');
    const lName = JSON.parse(localStorage.getItem("lName") || '""');
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


    // const str = 
    return <>
        <h1 class="text-3xl font-bold text-center">Monthly income for {fName} {lName}</h1>
        <div class="text-center">
            <div class="stats stats-vertical lg:stats-horizontal shadow">

                <div class="stat">
                    <div class="stat-title">Number of Cases</div>
                    <div class="stat-value">23</div>
                    <div class="stat-desc"></div>
                </div>

                <div class="stat">
                    <div class="stat-title">Current Income</div>
                    <div class="stat-value">4,200</div>
                    <div class="stat-desc">Baht</div>
                </div>

                <div class="stat">
                    <div class="stat-title">Total Hours Worked</div>
                    <div class="stat-value">72</div>
                    <div class="stat-desc">Hours</div>
                </div>

            </div>
        </div>

        <h1 class="text-2xl font-normal text-center">Monthly income history for {fName} {lName}</h1>

        <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
            <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <table className="table table-xs">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {/* item */}
                            <tr>
                                <th scope="col" className="p-4">
                                    Month
                                </th>
                                <th scope="col" className="p-4">
                                    Number of Cases
                                </th>
                                <th scope="col" className="p-4">
                                    Total Hours Worked
                                </th>
                                <th scope="col" className="p-4">
                                    Your Income
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
                                        <th>April 2024</th>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <td>45</td>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <td>560</td>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <td>87,000</td>
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