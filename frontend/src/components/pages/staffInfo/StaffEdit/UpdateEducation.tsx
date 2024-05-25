import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormWrapper from "../../FormWrapper";
import axios from 'axios';

type EduData = {
    level_edu: string;
    diploma: string;
    institute: string;
    country: string;
    year_graduated: string;
};

export default function DocUpdate() {
    const location = useLocation();
    const value = location.state.val;

    const [data, setData] = useState<EduData>(value);
    const [oldData, setOldData] = useState<EduData>(value)
    const id = location.state.id;

    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("data : ", data);
        try {
            const response = await axios.post("http://localhost:3000/api/updateStaffEducation", {
                level_edu: data.level_edu,
                diploma: data.diploma,
                institute: data.institute,
                country: data.country,
                year_graduated: data.year_graduated,

                id: id,
                old_level_edu: oldData.level_edu,
                old_diploma: oldData.diploma,

            });
            alert(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            navigate("/manage_staff/details", { replace: true, state: { val: id } });
        }
    };

    function goBack() {
        navigate("/manage_staff/details", { replace: true, state: { val: id } });
    }

    return (
        <>
            <form className="mx-auto w-1/2" onSubmit={submit}>
                <FormWrapper title="Doctor Update">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 divider">Education</h3>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Degree</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.level_edu}
                            onChange={(e) => setData({ ...data, level_edu: e.target.value })}
                        />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diploma</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.diploma}
                            onChange={(e) => setData({ ...data, diploma: e.target.value })}
                        />
                    </div>
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institute</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.institute}
                            onChange={(e) => setData({ ...data, institute: e.target.value })}
                        />
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.country}
                        onChange={(e) => setData({ ...data, country: e.target.value })}
                    />
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.year_graduated}
                            onChange={(e) => setData({ ...data, year_graduated: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button type="button" onClick={goBack} className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Cancele</button>
                    </div>
                </FormWrapper>
            </form>
        </>
    )
}