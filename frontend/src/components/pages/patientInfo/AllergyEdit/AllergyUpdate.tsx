import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormWrapper from "../../FormWrapper";
import axios from 'axios';

type AllergyData = {
    allergy_id: number;
    p_id: number;
    type_allergy: string;
    allergy: string;
    status_allergy: number;
};

export default function AllergyUpdate() {
    const location = useLocation();
    const value = location.state.val;
    const val = value.p_id;
    const role = localStorage.getItem("role_name");
    console.log("value: ", val);

    const [data, setData] = useState<AllergyData>(value);

    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("data : ", data);
        try {
            const response = await axios.post("http://localhost:3000/api/updatePatientAllergies", {
                allergy_id: data.allergy_id,
                type_allergy: data.type_allergy,
                allergy: data.allergy,
                status_allergy: data.status_allergy,
            });
            alert("Success");
        } catch (error) {
            console.error(error);
        } finally {
            if (role === `"register"`) {
                navigate("/manage_patient/details", { replace: true, state: { val: val } });
            } else {
            navigate("/search_patient/details", { replace: true, state: { val: val } });
            }
        }
    };

    function goBack() {
        if (role === `"register"`) {
            navigate("/manage_patient/details", { replace: true, state: { val: value } });
        } else {
        navigate("/search_patient/details", { replace: true, state: { val: value } });
        }
    }

    return (
        <>
            <form className="mx-auto w-1/3" onSubmit={submit}>
                <FormWrapper title="">
                    <br />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 divider">Update Allergy</h3>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Type
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="type_allergy"
                            value={data.type_allergy}
                            onChange={(e) => {
                                setData({ ...data, type_allergy: e.target.value });
                                console.log("data: ", data);
                            }}>
                            <option value="food">Food</option>
                            <option value="drug">Drug</option>
                            <option value="symptom">Symptom</option>
                        </select>

                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Allergy
                        </label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="allergy"
                            value={data.allergy}
                            onChange={(e) => {
                                setData({ ...data, allergy: e.target.value });
                                console.log("data: ", data);
                            }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Status
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="status"
                            value={data.status_allergy}
                            onChange={(e) => {
                                setData({ ...data, status_allergy: e.target.value });
                            }}
                        >
                            <option value={0}>Inactive</option>
                            <option value={1}>Active</option>
                        </select>

                    </div>
                    <button type="submit" className="btn btn-primary flex mx-auto">Submit</button>
                    <button type="button" className="btn m-5 flex mx-auto" onClick={goBack}>Back</button>
                </FormWrapper>
            </form>
        </>
    )
}