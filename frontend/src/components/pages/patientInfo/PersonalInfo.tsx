import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PersonalInfo(props: { p_id: number }) {
  const { p_id } = props;
  const navigate = useNavigate();
  const [dummy_data, setDummyData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getPatientInfo/${p_id}`
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

  return (
    <>
      <div className="bg-blue-500 text-white font-bold text-3xl text-center py-4 px-2 rounded ml-10 w-full">
        Personal Info
      </div>
      <div className="flex flex-wrap justify-right items-right w-full h-full m-3 ml-10">
        <ul className="w-full">
          {dummy_data.map((data) => (
            <li key={data.p_id} className="w-full mb-4">
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="card mx-auto my-3 w-full py-3 px-5 bg-grey dark:bg-grey-500 relative sm:rounded-lg">
                  <div className="flex flex-col">
                    {/* <div className="text-lg font-bold text-white ">Patient ID : {data.p_id}</div> */}
                    <div className="text-lg font-bold text-white">
                      {data.fName} {data.lName}
                    </div>
                    {/* <div className="text-lg font-bold text-white">{data.lName}</div> */}
                    <div className="text-sm text-white">
                      ID Number : {data.idNumber}
                    </div>
                    <div className="text-sm text-white">Sex : {data.sex}</div>
                    <div className="text-sm text-white">
                      Address : {data.addresses}
                    </div>
                    <div className="text-sm text-white">Tel : {data.tel}</div>
                    <div className="text-sm text-white">
                      Email : {data.email}
                    </div>
                    <div className="text-sm text-white">
                      Nationality : {data.nationality}
                    </div>
                    <div className="text-sm text-white">Race : {data.race}</div>
                    <div className="text-sm text-white">
                      Religion : {data.religion}
                    </div>
                    <div className="text-sm text-white">
                      Blood Type : {data.bloodType}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
