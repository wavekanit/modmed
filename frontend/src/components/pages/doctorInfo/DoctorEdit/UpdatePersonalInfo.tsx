import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormWrapper from "../../FormWrapper";
import axios from 'axios';

type DocData = {
    id: number;
    fName: string;
    mName: string;
    lName: string;
    idNumber: string;
    DOB: Date;
    sex: string;
    addresses: string;
    tel: string;
    nationality: string;
    race: string;
    religion: string;
    bloodType: string;
    d_department_id: number;
    d_license_id: string;
    email: string;
};

export default function DocUpdate() {
    const location = useLocation();
    const value = location.state.val;
    const val = value.id;

    const [data, setData] = useState<DocData>(value);
    data.DOB = new Date(data.DOB).toISOString().slice(0, 19).replace('T', ' ');
    console.log("data : ", data);

    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("data : ", data);
        try {
            const response = await axios.post("http://localhost:3000/api/updateDoctorInfo", {
                fName: data.fName,
                mName: data.mName,
                lName: data.lName,
                idNumber: data.idNumber,
                DOB: data.DOB,
                sex: data.sex,
                id: data.id,
                addresses: data.addresses,
                tel: data.tel,
                nationality: data.nationality,
                race: data.race,
                religion: data.religion,
                bloodType: data.bloodType,
                d_department_id: data.d_department_id,
                d_license_id: data.d_license_id,
                email: data.email,

            });
            alert(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            navigate("/manage_doctor/details", { replace: true, state: { val: val } });
        }
    };

    function goBack() {
        navigate("/manage_doctor/details", { replace: true, state: { val: val } });
    }
    function goEdu(val) {
        navigate("/manage_doctor/details/doctor_update_edu", { replace: true, state: { val: val } });
    }

    return (
        <>
            <form className="mx-auto w-1/2" onSubmit={submit}>
                <FormWrapper title="Doctor Update">
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            First Name
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="firstName"
                            value={data.fName}
                            onChange={(e) => {
                                setData({ ...data, fName: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Middle Name
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="middleName"
                            value={data.mName}
                            onChange={(e) => {
                                setData({ ...data, mName: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Last Name
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="lastName"
                            value={data.lName}
                            onChange={(e) => {
                                setData({ ...data, lName: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            ID Number
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="idNumber"
                            value={data.idNumber}
                            onChange={(e) => {
                                setData({ ...data, idNumber: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>


                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Sex
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="sex"
                            value={data.sex}
                            onChange={(e) => {
                                setData({ ...data, sex: e.target.value });
                                console.log("data: ", data);
                            }}>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Date of Birth
                        </label>
                        <input type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="DOB"
                            value={data.DOB ? new Date(data.DOB).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                setData({ ...data, DOB: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Address
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="addresses"
                            value={data.addresses}
                            onChange={(e) => {
                                setData({ ...data, addresses: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Tel
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="tel"
                            value={data.tel}
                            onChange={(e) => {
                                setData({ ...data, tel: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Email
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="email"
                            value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Nationality
                        </label>
                        <input type="nationality"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="allergy"
                            value={data.nationality}
                            onChange={(e) => {
                                setData({ ...data, nationality: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Race
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="race"
                            value={data.race}
                            onChange={(e) => {
                                setData({ ...data, race: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Religion
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="religion"
                            value={data.religion}
                            onChange={(e) => {
                                setData({ ...data, religion: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Type</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.bloodType}
                            onChange={(e) => setData({ ...data, bloodType: e.target.value })}
                        >
                            <option value="">Select blood type</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="A+">A+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="B+">B+</option>
                            <option value="AB">AB</option>
                            <option value="AB-">AB-</option>
                            <option value="AB+">AB+</option>
                            <option value="O">O</option>
                            <option value="O-">O-</option>
                            <option value="O+">O+</option>
                        </select>
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.d_department_id}
                            onChange={(e) => setData({ ...data, d_department_id: e.target.value })}
                        >
                            <option value="0">Select department</option>
                            <option value="1">Bone</option>
                            <option value="2">Eye</option>
                            <option value="3">Heart</option>
                            <option value="4">Dental</option>
                            <option value="5">Skin</option>
                            <option value="6">Ear, Nose, Throat</option>
                        </select>
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            License ID
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="license_id"
                            value={data.d_license_id}
                            onChange={(e) => {
                                setData({ ...data, d_license_id: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Email
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="email"
                            value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" onClick={goBack} className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Cancel</button>
                    </div>
                </FormWrapper>
            </form>
        </>
    )
}