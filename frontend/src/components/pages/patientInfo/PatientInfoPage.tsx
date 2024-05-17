import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import AllergyInfo from './Allergy';
import CureHistory from './CureHistory';
import PersonalInfo from './PersonalInfo';

export default function PatientInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const p_id = location.state.val;

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
    // console.log("dummy_data:", dummy_data);
  }, [dummy_data]);

  function goBack() {
    navigate("/search_patient");
  }
  return (
    <>
      {/* <div className='w-2/5 h-1/2 m-3 justify-right items-right'>
        <ul>
          {dummy_data.map((data) => (
            <li key={data.p_id}>
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="card mx-auto my-3 w-4/6 py-3 bg-white dark:bg-gray-800 relative sm:rounded-lg">
                  <div className="input w-4/6 input-bordered flex items-center mx-auto gap-2">
                    <div className="flex flex-col">
                      <div className="text-lg font-bold">Type : {data.type_allergy}</div>
                      <div className="text-sm">Allergy : {data.allergy}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
      <div className='my-3 mx-20 display: flex justify-content: space-between;'>
        <div className='mx-auto w-1/2 m-2 sm:rounded-lg bg-blue-900 flex justify-left items-left'>
          <PersonalInfo p_id={p_id}/>
        </div>
        <div className='mx-auto w-2/5 h-4/5 m-2 sm:rounded-lg bg-blue-900 flex justify-right items-right'>
          <AllergyInfo p_id={p_id}/>
        </div>
      </div>
      <div className='w-4/5 mx-auto m-3 sm:rounded-lg bg-blue-900 flex justify-right items-right'>
        <CureHistory p_id={p_id}/>
      </div>
      <button className='btn flex mx-auto' onClick={goBack}>Back</button>
    </>
  );
}
