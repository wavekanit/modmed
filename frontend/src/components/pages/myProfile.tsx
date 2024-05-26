import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";

export default function myProfile() {
    const fName = JSON.parse(localStorage.getItem("fName") || '""');
    const lName = JSON.parse(localStorage.getItem("lName") || '""');
    const email = JSON.parse(localStorage.getItem("email") || '""');
    const id = localStorage.getItem("id");
    const [dummy_data, setDummyData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Start fetching data from API")
                const response = await axios.get('http://localhost:3000/api/getStaffInfoByID/' + id);
                console.log(response)
                setDummyData(response.data);
            }
            catch (error) {
                console.log("Error fetching data from API:", error);
            }
        }
        fetchData();
    }, [])

    const navigate = useNavigate();

    function changePassword() {
        navigate("/my_profile/change_password", { replace: true, state: { val : id } });
    }

    function calculateAge(dob : any) {
        var today = new Date();
        var birthDate = new Date(dob);
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        return age_now;
      }

        return <>
            {/* {console.log(val)} */}
            <p className="card-title text-5xl text-white font-bold mt-5 mb-3 bg-blue-900 rounded-md p-3 w-3/5 mx-auto">Welcome to your profile! {fName} {lName}</p>
            <div className="card lg:card-side bg-base-100 shadow-xl w-3/5 mx-auto">
                <div className="card-body">
                    {dummy_data.map((item : any, index) => (
                        <div key={index} className='flex justify-between'>
                            <div className="mx-auto">
                                <h2 className="font-bold text-4xl text-white mb-3 bg-blue-900 rounded-md p-1 px-10">Personal Information</h2>
                                <li className="text-white text-lg">Email : {email}</li>
                                <li className="text-white text-lg">ID : {item.id} </li>
                                {
                                item.d_license_id ? 
                                <>
                                    <li className="text-lg text-white">Doctor license number : {item.d_license_id}</li> 
                                    <li className="text-lg text-white">Department : {item.department_name}</li>
                                </>
                                : null
                                }

                                <li className="text-lg text-white">Citizen ID Number : {item.idNumber}</li>
                                <li className="text-lg text-white">First Name : {item.fName}</li>
                                <li className="text-lg text-white">Middle Name : {item.mName != null ? item.mName : "-"}</li>
                                <li className="text-lg text-white">Last Name : {item.lName}</li>
                                <li className="text-lg text-white">Sex : {item.sex}</li>
                                <li className="text-lg text-white">Age : {calculateAge(item.DOB)}</li>
                                <li className="text-lg text-white">Address : {item.addresses}</li>
                                <li className="text-lg text-white">Telephone Number : {item.tel}</li>
                                <li className="text-lg text-white">Nationality : {item.nationality}</li>
                                <li className="text-lg text-white">Race : {item.race}</li>
                                <li className="text-lg text-white">Religion : {item.religion}</li>
                                <li className="text-lg text-white">Blood Type : {item.bloodType}</li>
                            </div>
                            <div className="mx-auto">

                                <h2 className="font-bold text-4xl text-white mb-3 bg-red-900 rounded-md p-1 px-10 mx-auto w-4/5">Emergency Contact</h2>
                                <li className="text-lg text-white">Name : {item.emergency_contact.fName} {item.emergency_contact.lName} ({item.emergency_contact.phone})</li>
                                <li className="text-lg text-white">Email : {item.emergency_contact.email}</li>
                                <li className="text-lg text-white">Address : {item.emergency_contact.address}</li>
                                <li className="text-lg text-white">Relationship : {item.relation}</li>
                                

                                <h2 className="font-bold text-4xl text-white mb-3 mt-5 bg-green-900 rounded-md p-1 px-8 mx-auto w-4/5">Educational History</h2>
                                    {item.educations.map((education : any, index2 : number) => (
                                        <div key={index2}>
                                            <li className="text-lg text-white">{education.diploma}, {education.institute}, {education.country} ({education.year_graduated})</li>
                                        </div>
                                    ))}
                            
                        </div>
                        </div>

                    ))}
                </div>
            </div>
            <button className="btn w-1/10 flex mx-auto my-5" onClick={changePassword}>
                Change Password
            </button>
        </>
    }

