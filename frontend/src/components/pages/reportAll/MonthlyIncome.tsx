import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MonthlyIncome() {
    const fName = JSON.parse(localStorage.getItem("fName") || '""');
    const lName = JSON.parse(localStorage.getItem("lName") || '""');
    const id = localStorage.getItem("id");
    const role_name = JSON.parse(localStorage.getItem("role_name") || '""');
    const [numberHours, setNumberHours] = useState([]);
    const [numberCases, setNumberCases] = useState([]);
    const [entierData, setEntierData] = useState([]);

    const getNumberHour = async () => {
        try {
            console.log("Start fetching data from API")
            const response = await axios.get('http://localhost:3000/api/getMonthlyIncome/' + id);
            console.log(response)
            setNumberHours(response.data);
        }
        catch (error) {
            console.log("Error fetching data from API:", error);
        }
    }

    const getCase = async () => {
        try {
            console.log("Start fetching data from API")
            const response = await axios.get('http://localhost:3000/api/getNumberCase/' + id);
            console.log(response)
            setNumberCases(response.data);
            // setDummyData(response.data);
        }
        catch (error) {
            console.log("Error fetching data from API:", error);
        }

    }

    const dummy = [];
    if (role_name === "doctor") {
        for (let i = 0; i < numberHours.length; i++) {
            dummy.push({
                month: numberHours[i].month,
                year: numberHours[i].year,
                numberCases: numberCases[i].number_case,
                hours_worked: numberHours[i].hours_worked,
                income: numberHours[i].income
            });
        }
    }
    else{
        for (let i = 0; i < numberHours.length; i++) {
            dummy.push({
                month: numberHours[i].month,
                year: numberHours[i].year,
                hours_worked: numberHours[i].hours_worked,
                income: numberHours[i].income
            });
        }
    
    }

    useEffect(() => {
        getNumberHour(),
            getCase();
    }, []);
    let hours_thisMonth = 0;
    let income_thisMonth = 0;
    let numberCases_thisMonth = 0;
    let key = 0;
    let date = new Date();
    dummy.map((item, index) => {
        key = index;
        if (item.month == date.getMonth() + 1) {
            hours_thisMonth += item.hours_worked;
            income_thisMonth += item.income;
            numberCases_thisMonth += item.numberCases;
        }
    })

    // const str = 
    return <>
        <h1 className="text-3xl font-bold text-center">Monthly income for {fName} {lName}</h1>
        <div className="text-center">
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                {role_name === "doctor" ?
                    <div className="stat">
                        <div className="stat-title">Number of Cases</div>
                        <div className="stat-value">{numberCases_thisMonth}</div>
                        <div className="stat-desc">Cases</div>
                    </div> : ""}

                <div className="stat">
                    <div className="stat-title">Current Income</div>
                    <div className="stat-value">{income_thisMonth}</div>
                    <div className="stat-desc">Baht</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Hours Worked</div>
                    <div className="stat-value">{hours_thisMonth}</div>
                    <div className="stat-desc">Hours</div>
                </div>

            </div>
        </div>

        <h1 className="text-2xl font-normal text-center">Previous History</h1>

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

                                {role_name === "doctor" ?
                                    <th scope="col" className="p-4">
                                        Number of Cases
                                    </th> : ""}
                                <th scope="col" className="p-4">
                                    Total Hours Worked
                                </th>
                                <th scope="col" className="p-4">
                                    Your Income
                                </th>
                            </tr>
                        </thead>
                        <tbody>{dummy.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                {/* Data for each column */}
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <th>{item.month}-{item.year}</th>
                                    </div>
                                </td>
                                {role_name === "doctor" ?
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center">
                                            <td>{item.numberCases}</td>
                                        </div>
                                    </td> : ""}
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <td>{item.hours_worked}</td>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <td>{item.income}</td>
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