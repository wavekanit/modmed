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
    navigate("/manage_staff");
  }
  console.log("id:", id);
  
  return (
    <>
        <div className='overflow-y-auto mx-auto overflow-x-hidden w-2/3 h-full '>
            <PersonalInfo id={id}/>
        </div>
      <button className='btn flex mx-auto' onClick={goBack}>Back</button>
    </>
  );
}