import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormWrapper from "../../FormWrapper";
import axios from 'axios';

type CureData = {
    p_id: number;
    date_cure: Date;
    basic_symp: string;
    diag_result: string;
    methods: string;
    progress_status: number;
    d_id: number;
    room_id: number;
    date_finished: Date;
};

export default function CureUpdate() {
    const location = useLocation();
    const value = location.state.val;
    const val = value.p_id;

    const [data, setData] = useState<CureData>(value);

    const navigate = useNavigate();

    
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const date = new Date(data.date_cure);
        const adjustedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        const formattedDate = adjustedDate.toISOString().slice(0, 19).replace('T', ' ');

        try {
            const response = await axios.post("http://localhost:3000/api/updateCure", {
                p_id: data.p_id,
                date_cure: formattedDate,
                basic_symp: data.basic_symp,
                diag_result: data.diag_result,
                methods: data.methods,
            });
            alert("Success");
        } catch (error) {
            console.error(error);
        } finally {
            navigate("/search_patient/details", { replace: true, state: { val: val } });
        }
    };

    function goBack() {
        navigate("/search_patient/details", { replace: true, state: { val: val } });
    }

    return (
        <>
            <form className="mx-auto w-1/2" onSubmit={submit}>
                <FormWrapper title="Allergy Update">
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Basic Symptom
                        </label>
                        <input  type="text" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="basic_symp" 
                                value={data.basic_symp} 
                                onChange={(e) => {
                                    setData({...data, basic_symp: e.target.value});
                                }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Diagnosis Result
                        </label>
                        <input  type="text" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="diag_result" 
                                value={data.diag_result} 
                                onChange={(e) => {
                                    setData({...data, diag_result: e.target.value});
                                }} />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Methods
                        </label>
                        <input  type="text" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="methods" 
                                value={data.methods} 
                                onChange={(e) => {
                                    setData({...data, methods: e.target.value});
                                }} />
                    </div>
                    <button type="submit" className="btn btn-primary m-5 flex mx-auto">Submit</button>
                    <button type="button" className="btn m-5 flex mx-auto" onClick={goBack}>Back</button>
                </FormWrapper>
            </form>
        </>
    )
}