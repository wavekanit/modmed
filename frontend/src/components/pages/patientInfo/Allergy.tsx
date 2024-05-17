import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function AllergyInfo(props: { p_id: number }) {
  const { p_id } = props;
  console.log("p_id:", p_id);

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

  return (
    <>
        <div>Allergy this is p_id -- {p_id} --</div>
        <div className='w-2/5 h-1/2 m-3 justify-right items-right'>
        <ul>
          {dummy_data.map((data) => (
            <li key={data.p_id}>
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="card mx-auto my-3 w-4/6 py-3 bg-white dark:bg-gray-800 relative sm:rounded-lg">
                  <div className="input w-4/6 input-bordered flex items-center mx-auto gap-2">
                    <div className="flex flex-col">
                    <div className="text-lg font-bold">p_id : {data.p_id}</div>
                      <div className="text-lg font-bold">Type : {data.type_allergy}</div>
                      <div className="text-sm">Allergy : {data.allergy}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

