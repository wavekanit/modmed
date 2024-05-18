import React from 'react'
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

export default function insertCureHist() {
    const location = useLocation();
    const value = location.state.val;
    const d_id = localStorage.getItem("id");
    console.log("d_id: ", d_id);

    const NewCure: CureData = {
        p_id: value,
        date_cure: new Date,
        basic_symp: "",
        diag_result: "",
        methods: "",
        progress_status: 1,
        d_id: Number(d_id),
        room_id: 0,
        date_finished: new Date,
    };

    const [data, setData] = useState<CureData>(NewCure);

    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("data : ", data);
        try {
            const response = await axios.post("http://localhost:3000/api/addCure", {
                p_id: data.p_id,
                date_cure: data.date_cure,
                basic_symp: data.basic_symp,
                diag_result: data.diag_result,
                methods: data.methods,
                progress_status: data.progress_status,
                d_id: data.d_id,
                room_id: null,
                date_finished: data.date_finished,
            });
            alert("success");
        } catch (error) {
            console.error(error);
        } finally {
            navigate("/search_patient/details", { replace: true, state: { val: value } });
        }
    }

    function goBack() {
        navigate("/search_patient/details", { replace: true, state: { val: value } });
    }

    return (
        <>
          <div className="mx-auto w-1/2">
            <FormWrapper title="Insert Cure History">
                <form onSubmit={submit}>
                    {/* <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Date
                        </label>
                        <input  type="date" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="date" 
                                value={data.date_cure}
                                onChange={(e) => {
                                    setData({ ...data, date_cure: e.target.value });
                                    console.log("data: ", data);
                                }}
                                />
                    </div> */}
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
                                    console.log("data: ", data);
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
                                    console.log("data: ", data);
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
                                    console.log("data: ", data);
                                }} />
                    </div>
                    {/* <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Progress Status
                        </label>
                        <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="progress_status" 
                            value={data.progress_status} 
                            onChange={(e) => {
                                setData({...data, progress_status: parseInt(e.target.value)});
                                console.log("data: ", data);
                            }} >
                            <option value="1">Infected</option>
                            <option value="0">Cured</option>
                        </select>
                    </div> */}
                    {/* <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Doctor ID
                        </label>
                        <input  type="number" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="d_id" 
                                value={data.d_id} 
                                onChange={(e) => {
                                    setData({...data, d_id: parseInt(e.target.value)});
                                    console.log("data: ", data);
                                }} />
                    </div> */}
                    {/* <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Room ID
                        </label>
                        <input  type="number" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="room_id" 
                                value={data.room_id} 
                                onChange={(e) => {
                                    setData({...data, room_id: parseInt(e.target.value)});
                                    console.log("data: ", data);
                                }} />
                    </div> */}
                    {/* <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                          Date Finished
                        </label>
                        <input  type="date" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="date_finished" 
                                value={data.date_finished} 
                                onChange={(e) => {
                                    setData({...data, date_finished: e.target.value});
                                    console.log("data: ", data);
                                }} />
                    </div> */}
                <button type="submit" className="btn btn-primary m-5 flex mx-auto">Submit</button>
                <button type="button" className="btn m-5 flex mx-auto" onClick={goBack}>Back</button>
            </form>
        </FormWrapper>
        </div>
    </>
  )
}