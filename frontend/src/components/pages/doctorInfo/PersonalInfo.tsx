import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PersonalInfo(props: { id: number }) {
    const { id } = props;
    const navigate = useNavigate();
    const [dummy_data, setDummyData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/getStaffInfoByID/${id}`
                );
                setDummyData(response.data);
            } catch (error) {
                console.error("Error fetching data from API:", error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {}, [dummy_data]);

    function goEdit(val) {
        navigate("/manage_doctor/details/doctor_update", { replace: true, state: { val: val } });
    }

    return (
        <>
            <div className="bg-blue-500 text-white text-center py-4 px-2 rounded ml-10 w-full">
                PersonalInfo of -- {id} --
            </div>
            <div className='flex flex-wrap justify-right items-right w-full h-full m-3 ml-10'>
                <ul className='w-full'>
                    {dummy_data.map((data) => (
                        <li key={data.id} className='w-full mb-4'>
                            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                                <div className="card mx-auto my-3 w-full py-3 px-5 bg-grey dark:bg-grey-500 relative sm:rounded-lg">
                                    <div className="flex flex-col">
                                        <div className="text-lg font-bold text-white ">Dotoc_ID : {data.id}</div>
                                        <div className="text-sm">First Name : {data.fName}</div>
                                        <div className="text-sm">Last Name : {data.lName}</div>
                                        <div>Your email : {data.email}</div>
                                        <div>Your ID Number : {data.id} </div>
                                        <div>Your doctor license number : {data.d_license_id}</div>
                                        <div>Your department : {data.d_department}</div>
                                        <div>Citizen ID Number : {data.idNumber}</div>
                                        <div>First Name : {data.fName}</div>
                                        <div>Middle Name : {data.mName != null ? data.mName : "-"}</div>
                                        <div>Last Name : {data.lName}</div>
                                        <div>Date of Birth : {new Date(data.DOB).getDate()}/{new Date(data.DOB).getMonth() + 1}/{new Date(data.DOB).getFullYear()}</div>
                                        <div>Sex : {data.sex}</div>
                                        <div>Address : {data.addresses}</div>
                                        <div>Telephone Number : {data.tel}</div>
                                        <div>Nationality : {data.nationality}</div>
                                        <div>Race : {data.race}</div>
                                        <div>Religion : {data.religion}</div>
                                        <div>Blood Type : {data.bloodType}</div>
                                        <div className="bg-grey-950">
                                            <span className="font-bold text-4xl text-red-500">Emergency Contact </span>
                                            <div>
                                                <div>Name : {data.emergency_contact.fName} {data.emergency_contact.lName} ({data.emergency_contact.phone})</div>
                                                <div>Email : {data.emergency_contact.email}</div>
                                                <div>Address : {data.emergency_contact.address}</div>
                                                <div>Relationship : {data.relation}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-bold text-xl">Educational History</span>
                                            <div>
                                                {data.educations.map((education, index2) => (
                                                    <div key={index2}>
                                                        {education.diploma}, {education.institute}, {education.country} ({education.year_graduated})
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => goEdit(data)}
                                className="mt-2 py-2 px-3 flex mx-auto text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2 -ml-0.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                                Edit
                            </button>
                        </li>

                    ))}

                </ul>
            </div>
        </>
    )
}