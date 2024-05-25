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

    function goEdit(val : any) {
        navigate("/manage_staff/details/staff_update", { replace: true, state: { val: val } });
    }

    function editEducation(val: any) {
        navigate("/manage_staff/details/education_update", { replace: true, state: { val: val, id : id } });
    }

    function addEducation() {
        navigate("/manage_staff/details/education_insert", { replace: true, state: { id : id } });
    }

    async function delEducation(val: any) {
        try {
            const response = await axios.post("http://localhost:3000/api/delStaffEducation", {
                id: id,
                level_edu: val.level_edu,
                diploma: val.diploma,
            });
            alert("Deletion Successfully !");
            navigate("/manage_staff/details", { replace: true, state: { val: id } });
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <div className="bg-blue-500 font-bold text-white text-2xl text-center py-4 px-2 rounded ml-10 w-full">
                Personal Infomation
            </div>
            <div className='card lg:card-side bg-base-100 shadow-xl w-full mx-auto'>
                <ul className='card-body'>
                {dummy_data.map((data : any, index) => (
                        <div key={index} className='flex justify-between'>
                            <div className="mx-auto">
                                <h2 className="font-bold text-3xl text-white mb-3 bg-blue-900 rounded-md p-1 px-10">Personal Information</h2>
                                <li className="text-white text-lg">Email : {data.email}</li>
                                <li className="text-white text-lg">ID : {data.id} </li>
                                {
                                data.d_license_id ? 
                                <>
                                    <li className="text-lg text-white">Doctor license number : {data.d_license_id}</li> 
                                    <li className="text-lg text-white">Department : {data.department_name}</li>
                                </>
                                : null
                                }

                                <li className="text-lg text-white">Citizen ID Number : {data.idNumber}</li>
                                <li className="text-lg text-white">First Name : {data.fName}</li>
                                <li className="text-lg text-white">Middle Name : {data.mName != null ? data.mName : "-"}</li>
                                <li className="text-lg text-white">Last Name : {data.lName}</li>
                                <li className="text-lg text-white">Date of Birth : {new Date(data.DOB).getDate()}/{new Date(data.DOB).getMonth() + 1}/{new Date(data.DOB).getFullYear()}</li>
                                <li className="text-lg text-white">Sex : {data.sex}</li>
                                <li className="text-lg text-white">Address : {data.addresses}</li>
                                <li className="text-lg text-white">Telephone Number : {data.tel}</li>
                                <li className="text-lg text-white">Nationality : {data.nationality}</li>
                                <li className="text-lg text-white">Race : {data.race}</li>
                                <li className="text-lg text-white">Religion : {data.religion}</li>
                                <li className="text-lg text-white">Blood Type : {data.bloodType}</li>
                            </div>
                            <div className="mx-auto">

                                <h2 className="font-bold text-3xl text-white text-center mb-3 bg-red-900 rounded-md p-1 px-10 mx-auto w-4/5">Emergency Contact</h2>
                                <li className="text-lg text-white">Name : {data.emergency_contact.fName} {data.emergency_contact.lName} ({data.emergency_contact.phone})</li>
                                <li className="text-lg text-white">Email : {data.emergency_contact.email}</li>
                                <li className="text-lg text-white">Address : {data.emergency_contact.address}</li>
                                <li className="text-lg text-white">Relationship : {data.relation}</li>
                                <h2 className="font-bold text-3xl text-white text-center mb-3 mt-5 bg-green-900 rounded-md p-1 px-8 mx-auto w-4/5">Educational History</h2>
                                            <div>
                                                {data.educations.map((education: any, index2 : number) => (
                                                    <div key={index2}>
                                                        {education.diploma}, {education.institute}, {education.country} ({education.year_graduated})
                                                        <button type="button" className="btn m-1 mx-2 btn-sm" onClick={() => editEducation(education)}>
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
                                                        <button type="button" className="btn m-1 mx-2 btn-sm" onClick={() => delEducation(education)}>
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
                                                            Delete
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" className="btn my-1 flex mx-auto" onClick={addEducation}>
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
                                                            Add More Education
                                                        </button>
                                        </div>

                                
                            
                        </div>
                    <div className='flex justify-between'>
                        </div>
                        </div>

                    ))}
                        <button
                            type="button"
                            onClick={() => goEdit(dummy_data[0])}
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
                            Edit Personal Infomation
                        </button>

                </ul>
            </div>
        </>
    )
}