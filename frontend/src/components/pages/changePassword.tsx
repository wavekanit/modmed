import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormWrapper from "./FormWrapper";
import axios from 'axios';

export default function ChangePassword() {
    const id = localStorage.getItem("id");
    const navigate = useNavigate();
    const [newPw, setNewPw] = useState("");
    const [confirmNewPw, setConfirmNewPw] = useState("");
    const [error, setError] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPw !== confirmNewPw) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/updateStaffPassword", {
                id: id,
                newpw : newPw,
            });
            alert("Change Password Successfully !");
        } catch (error) {
            console.error(error);
        } finally {
            navigate("/my_profile", { replace: true });
        }
    };

    function goBack() {
        navigate("/my_profile", { replace: true });
    }

    return (
        <>
            <form className="mx-auto w-1/2" onSubmit={submit}>
                <FormWrapper title="Change Password">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
                        New Password
                    </label>
                    <input type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="newPw"
                        value={newPw}
                        onChange={(e) => {
                            setNewPw(e.target.value);
                            setError("");
                        }} />
                    
                    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            Confirm New Password
                        </label>
                        <input type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="confirmNewPw"
                            value={confirmNewPw}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setConfirmNewPw(e.target.value);
                                setError("");
                            }} />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" onClick={goBack} className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Cancel</button>
                    </div>
                </FormWrapper>
            </form>
        </>
    )
}