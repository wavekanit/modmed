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

  function goBack() {
    navigate("/search_patient");
  }
  
  return (
    <>
      <div className='flex flex-wrap justify-between my-3 mx-10'>
        <div className='overflow-y-auto overflow-x-hidden w-full sm:w-1/2 p-2 h-80'>
          <PersonalInfo p_id={p_id}/>
        </div>
        <div className='overflow-y-auto overflow-x-hidden w-full sm:w-1/2 p-2 h-80'>
          <AllergyInfo p_id={p_id}/>
        </div>
      </div>
        <div className='overflow-y-auto overflow-x-hidden w-full sm:w-5/6 p-2 h-80 sm:rounded-lg mx-auto'>
          <CureHistory p_id={p_id}/>
        </div>
      <button className='btn my-3 flex mx-auto' onClick={goBack}>Back</button>
    </>
  );
}