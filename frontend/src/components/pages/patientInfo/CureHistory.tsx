import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CureHistory(props: { p_id: number }) {
  const { p_id } = props;
  const navigate = useNavigate();
  const [dummy_data, setDummyData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getCurehistory/${p_id}`
        );
        setDummyData(response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }

    if (p_id) {
      fetchData();
    }
  }, [p_id]);

  useEffect(() => {}, [dummy_data]);

  function insertCure(val) {
    navigate("/search_patient/details/cure_insert", { replace: true, state: { val: val } });
  }
  function updateCure(val) {
    navigate("/search_patient/details/cure_update", { replace: true, state: { val: val } });
  }

  return (
    <>
      <div className="bg-blue-500 text-white text-center py-4 px-2 rounded ml-10 w-full">
        Cure History of -- {p_id} --
      </div>
      <div className='flex flex-wrap justify-right items-right w-full h-full m-3 ml-10'>
        <ul className='w-full'>
          {dummy_data.map((data) => (
            <li key={data.p_id} className='w-full mb-4'>
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="card mx-auto my-3 w-full py-3 px-5 bg-grey dark:bg-grey-500 relative sm:rounded-lg">
                  <div className="flex flex-col">
                    <div className="text-lg font-bold text-white ">P_ID : {data.p_id}</div>
                    <div className="text-sm">Date : {data.date_cure}</div>
                    <div className="text-sm">Symptom : {data.basic_symp}</div>
                    <div className="text-sm">Status : {data.progress_status}</div>
                  </div>
                  <button
                        type="button"
                        onClick={() => updateCure(data)}
                        className="mt-2 py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => insertCure(p_id)}
          className="py-3 px-4 flex mx-auto items-center font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 -ml-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
          Add
        </button>
      </div>
    </>
  )
}