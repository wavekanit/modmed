import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormWrapper from "../../FormWrapper";
import axios from 'axios';

type DocData = {
    fName: string;
    mName: string;
    lName: string;
    idNumber: string;
    sex: string;
    id: number;
};

export default function DocUpdate() {
    const location = useLocation();
    const value = location.state.val;
    const val = value.id;

    const [data, setData] = useState<DocData>(value);

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
                sex: data.sex,
                id: data.id,

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

    return (
        <>
            <form className="mx-auto w-1/2" onSubmit={submit}>
                <FormWrapper title="Doctor Update">
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Sex
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="type_allergy"
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
                            First Name
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="allergy"
                            value={data.fName}
                            onChange={(e) => {
                                setData({ ...data, fName: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Last Name
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="allergy"
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
                            name="allergy"
                            value={data.idNumber}
                            onChange={(e) => {
                                setData({ ...data, idNumber: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>

                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Middle Name
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="allergy"
                            value={data.mName}
                            onChange={(e) => {
                                setData({ ...data, mName: e.target.value });
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