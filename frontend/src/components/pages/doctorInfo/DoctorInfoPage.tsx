import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import AllergyInfo from './Allergy';
// import CureHistory from './CureHistory';
import PersonalInfo from './PersonalInfo';

export default function PatientInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.val;

  function goBack() {
    navigate("/manage_doctor");
  }
  console.log("id:", id);
  
  return (
    <>
        <div className='overflow-y-auto overflow-x-hidden w-5/6 h-full p-2 '>
            <PersonalInfo id={id}/>
        </div>
      <button className='btn flex mx-auto' onClick={goBack}>Back</button>
    </>
  );
}