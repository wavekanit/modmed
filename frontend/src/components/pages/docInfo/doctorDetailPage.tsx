import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DoctorDetailPage() {
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const location = useLocation();
    const val = location.state.val;

    function goBack() {
        navigate("/manage_doctor");
    }

    function confDel() {
        setConfirmDelete(!confirmDelete);
    }

    function delSuces() {
        alert("Sucessfully Delete Doctor !");
        navigate("/manage_doctor/details");
    }

    function editInfo() {
        navigate("/manage_doctor/details/edit", {replace: true, state: {val}});
    }

    return (
        <>
            {console.log(val)}
            <div className="card w-96 bg-base-100 shadow-xl my-2 mx-auto">
                <div className="card-body">
                    <div className="card-actions justify-end">
                        <button className="btn btn-square btn-sm" onClick={goBack}>X</button>
                    </div>
                    <h2 className="card-title">
                        {val.fName} {val.mName ? val.mName : ""} {val.lName}
                    </h2>
                    <li>Gender : {val.sex}</li>
                    <li>Email : {val.email}</li>
                    <li>id Number : {val.idNumber}</li>
                    <li>Nationality : {val.nationality}</li>
                    <li>Tel : {val.tel}</li>
                    <div className="card-actions justify-end">
                        {!confirmDelete ?
                            <>
                                <button
                                  type="button"
                                  onClick={confDel}
                                  data-modal-target="delete-modal"
                                  data-modal-toggle="delete-modal"
                                  className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2 -ml-0.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                  </svg>
                                  Delete
                                </button>

                                <button
                                  type="button"
                                  onClick={editInfo}
                                  className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-2 -ml-0.5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
                                    </svg>
                                  Edit
                                </button>
                                </>   
                        : <>
                            <div
                            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-full p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50"
                             >
                            <div className="relative w-full h-auto max-w-md">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                type="button"
                                onClick={confDel}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-toggle="delete-modal"
                                >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                <svg
                                    aria-hidden="true"
                                    className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this?
                                </h3>
                                <button
                                    data-modal-toggle="delete-modal"
                                    type="button"
                                    onClick={delSuces}
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    data-modal-toggle="delete-modal"
                                    type="button"
                                    onClick={confDel}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    No, cancel
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    );
}