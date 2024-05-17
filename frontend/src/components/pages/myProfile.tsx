import axios from "axios";
import React from "react";

import { FormEvent, useState, useEffect } from "react";

export default function myProfile({ }: Props) {
    const fName = JSON.parse(localStorage.getItem("fName") || '""');
    const lName = JSON.parse(localStorage.getItem("lName") || '""');
    const roleName = JSON.parse(localStorage.getItem("role_name") || '""');
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

    if (roleName === "doctor") {
        return <>
            {/* {console.log(val)} */}
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
                <div class="card-body">
                    {dummy_data.map((item, index) => (
                        <div key={index}>
                            <h2 class="card-title">Welcome to your profile! Dr. {fName} {lName}</h2>
                            <h3>Your email : {email}</h3>
                            <li>Your ID Number : {item.id} </li>
                            <li>Your doctor license number : {item.d_license_id}</li>
                            <li>Your department : {item.d_department}</li>
                            <li>Citizen ID Number : {item.idNumber}</li>
                            <li>First Name : {item.fName}</li>
                            <li>Middle Name : {item.mName != null ? item.mName : "-"}</li>
                            <li>Last Name : {item.lName}</li>
                            <li>Date of Birth : {new Date(item.DOB).getDate()}/{new Date(item.DOB).getMonth() + 1}/{new Date(item.DOB).getFullYear()}</li>
                            <li>Sex : {item.sex}</li>
                            <li>Address : {item.addresses}</li>
                            <li>Telephone Number : {item.tel}</li>
                            <li>Nationality : {item.nationality}</li>
                            <li>Race : {item.race}</li>
                            <li>Religion : {item.religion}</li>
                            <li>Blood Type : {item.bloodType}</li>
                            <li class="shadow-xl bg-red-950"><span className="font-bold text-4xl text-red-500">Emergency Contact </span>
                                <ul>
                                    <li>Name : {item.emergency_contact.fName} {item.emergency_contact.lName} ({item.emergency_contact.phone})</li>
                                    <li>Email : {item.emergency_contact.email}</li>
                                    <li>Address : {item.emergency_contact.address}</li>
                                    <li>Relationship : {item.relation}</li>
                                </ul>
                            </li>
                            <li><span class="font-bold text-xl">Educational History</span>
                                <ul>
                                    {item.educations.map((education, index2) => (
                                        <li key={index2}>
                                            {education.diploma}, {education.institute}, {education.country} ({education.year_graduated})
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </div>

                    ))}

                </div>
            </div>
        </>
    }
    else {
        return <>
            {/* {console.log(val)} */}
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
                <div class="card-body">
                    {dummy_data.map((item, index) => (
                        <div key={index}>
                            <h2 class="card-title">Welcome to your profile! {fName} {lName}</h2>
                            <h3>Your email : {email}</h3>
                            <li>Your ID Number : {item.id} </li>
                            <li>Citizen ID Number : {item.idNumber}</li>
                            <li>First Name : {item.fName}</li>
                            <li>Middle Name : {item.mName != null ? item.mName : "-"}</li>
                            <li>Last Name : {item.lName}</li>
                            <li>Date of Birth : {new Date(item.DOB).getDate()}/{new Date(item.DOB).getMonth() + 1}/{new Date(item.DOB).getFullYear()}</li>
                            <li>Sex : {item.sex}</li>
                            <li>Address : {item.addresses}</li>
                            <li>Telephone Number : {item.tel}</li>
                            <li>Nationality : {item.nationality}</li>
                            <li>Race : {item.race}</li>
                            <li>Religion : {item.religion}</li>
                            <li>Blood Type : {item.bloodType}</li>
                            <li class="shadow-xl bg-red-950"><span className="font-bold text-4xl text-red-500">Emergency Contact </span>
                                <ul>
                                    <li>Name : {item.emergency_contact.fName} {item.emergency_contact.lName} ({item.emergency_contact.phone})</li>
                                    <li>Email : {item.emergency_contact.email}</li>
                                    <li>Address : {item.emergency_contact.address}</li>
                                    <li>Relationship : {item.relation}</li>
                                </ul>
                            </li>
                            <li><span class="font-bold text-xl">Educational History</span>
                                <ul>
                                    {item.educations.map((education, index2) => (
                                        <li key={index2}>
                                            {education.diploma}, {education.institute}, {education.country} ({education.year_graduated})
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </div>

                    ))}

                </div>
            </div>
        </>
    }
}

