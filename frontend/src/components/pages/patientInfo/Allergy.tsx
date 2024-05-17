import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AllergyInfo(props: { p_id: number }) {
  const { p_id } = props;
  // console.log("p_id:", p_id);
  const navigate = useNavigate();
  const [dummy_data, setDummyData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getPatientAllergy/${p_id}`
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

  useEffect(() => {
    console.log("dummy_data:", dummy_data);
  }, [dummy_data]);

  function handleCheckboxChange(index: number, value: string) {
    const newData = [...dummy_data];
    newData[index].status_allergy = value === '1' ? '0' : '1';
    setDummyData(newData);
  }

  function goEdit(val) {
    navigate("/search_patient/details/allergy_update" , {replace : true, state: {val: val}});
  }

  return (
    <>
        <div className="bg-blue-500 text-white text-center py-4 px-2 rounded ml-10 w-full">
            Allergy this is Info of -- {p_id} --
        </div>
        <div className='flex flex-wrap justify-right items-right w-full h-full m-3 ml-10'>
            <ul className='w-full'>
            {dummy_data.map((data, index) => (
                <li key={data.allergy_id} className='w-full mb-4'>
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="card mx-auto my-3 w-full py-3 px-5 bg-grey dark:bg-grey-500 relative sm:rounded-lg">
                        <div className="flex flex-col">
                        <div className="text-lg font-bold text-white ">ALLERGY_ID : {data.allergy_id}</div>
                        <div className="text-sm">Type : {data.type_allergy}</div>
                        <div className="text-sm">Allergy : {data.allergy}</div>
                        </div>
 
                    <button
                        type="button"
                        onClick={() => goEdit(data)}
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
                        <label className="inline-flex items-center cursor-pointer mt-2">
                            <input 
                                    type="checkbox" 
                                    value={data.status_allergy} 
                                    className="sr-only peer" 
                                    checked={data.status_allergy === '1'}
                                    onChange={() => handleCheckboxChange(index, data.status_allergy)} 
                                />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{data.status_allergy === '1' ? 'Infected' : 'Not Infected'}</span>
                        </label>
                    </div>
                </div>
               </li>
            ))}
        </ul>
      </div>
    </>
  )
}