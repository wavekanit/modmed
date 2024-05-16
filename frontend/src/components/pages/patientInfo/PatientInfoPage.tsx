import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import AllergyInfo from './Allergy';
import { useLocation } from 'react-router-dom';

export default function PatientInfoPage() {
  const location = useLocation();
  const d_id = location.state.val;

  const [dummy_data, setDummyData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getPatientAllergy/${d_id}`
        );
        setDummyData(response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }

    if (d_id) {
      fetchData();
    }
  }, [d_id]);

  useEffect(() => {
    console.log("dummy_data:", dummy_data);
  }, [dummy_data]);

  return (
    <>
      <ul>
        {dummy_data.map((data) => (
          <li key={data.p_id}>
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="card mx-auto my-3 w-4/6 py-3 bg-white dark:bg-gray-800 relative sm:rounded-lg">
                <div className="input w-4/6 input-bordered flex items-center mx-auto gap-2">
                  <div className="flex flex-col">
                    <div className="text-lg font-bold">{data.type_allergy}</div>
                    <div className="text-sm">{data.allergy}</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <AllergyInfo/>
    </>
  );
}
