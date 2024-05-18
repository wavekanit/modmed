import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function IncomeAll() {
    const id = localStorage.getItem("id");
    const [dummy_data, setDummyData] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month);
    };

    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };
    const [minYear, setMinYear] = useState<number | null>(null);
    const [maxYear, setMaxYear] = useState<number | null>(null);

    const getMinMaxYearApi = async () => {
        try {
            const response = await fetch("http://localhost:3000/getMinMaxYearProfit");
            const data = await response.json();
            setMinYear(parseInt(data[0].min_year));
            setMaxYear(parseInt(data[0].max_year));
            console.log(data);
            console.log(minYear, maxYear);
        } catch (error) {
            console.error("Error fetching data from API:", error);
        }
    };

    const [year, setYear] = useState<number[]>([]);

    useEffect(() => {
        getMinMaxYearApi();
        console.log(minYear, maxYear);
        if (minYear && maxYear) {
            const years = [];
            for (let i = minYear; i <= maxYear; i++) {
                years.push(i);
            }
            setYear(years);
        }
    }, [minYear, maxYear]);

    // const [role, setRole] = useState<Role[]>([]);
    const [info, setInfo] = useState<Case[]>([]);

    const getNumber = async (month: number | null, year: number | null) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/getSummaryOfIncome/${month}/${year}`
            );
            const data = await response.json();
            console.log(data);
            setInfo(data);
        } catch (error) {
            console.error("Error fetching data from API:", error);
        }
    };

    useEffect(() => {
        getNumber(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const getSum = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(selectedMonth, selectedYear);
        getNumber(selectedMonth, selectedYear);
    };



    return <>
        <h1 className="text-3xl font-bold text-center">Income Summary for Each Staff</h1>

        <form onSubmit={getSum}>
            <div className="my-5 text-center">
                <div>
                    <h2 className="text-xl">Select Month</h2>
                    <div className="join justify-center">
                        {Array.from({ length: 12 }, (_, index) => (
                            <input
                                key={index}
                                className="join-item btn btn-square"
                                type="radio"
                                name="monthS"
                                value={String(index + 1)}
                                aria-label={String(index + 1)}
                                onChange={() => handleMonthChange(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl">Select Year</h2>
                    <select
                        className="select w-full max-w-xs"
                        onChange={(e) => handleYearChange(Number(e.target.value))}
                    >
                        <option disabled selected>
                            Select Year
                        </option>
                        {year.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <button className="btn btn-primary my-2" type="submit">
                  Find
                </button> */}
            </div>
        </form>


        <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
            <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <table className="table table-xs">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {/* item */}
                            <tr>
                                <th scope="col" className="p-4">
                                    ID
                                </th>
                                <th scope="col" className="p-4">
                                    Name - Surname
                                </th>
                                <th scope="col" className="p-4">
                                    Roles
                                </th>
                                <th scope="col" className="p-4">
                                    Total Hours worked
                                </th>
                                <th scope="col" className="p-4">
                                    Monthly Income
                                </th>
                            </tr>
                        </thead>
                        <tbody>{info.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                {/* Data for each column */}
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <th>{item.id}</th>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <td>{item.fName} {item.lName}</td>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <td>{item.role_name}</td>
                                    </div>
                                </td>
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