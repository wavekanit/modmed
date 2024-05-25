import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../FormWrapper';
import axios from 'axios';

type EmergencyContact = {
  fName: string;
  mName: string;
  lName: string;
  tel: string;
  email: string;
  addresses: string;
};


type PatientData = {
  fName: string;
  mName: string;
  lName: string;
  idNumber: string;
  DOB: string;
  sex: string;
  addresses: string;
  tel: string;
  email: string;
  nationality: string;
  race: string;
  religion: string;
  bloodType: string;
  emergency: EmergencyContact;
  relation: string;
};

export default function InsertPatient() {
  const NewDoc: PatientData = {
    fName: '',
    mName: '',
    lName: '',
    idNumber: '',
    DOB: new Date().toISOString().split('T')[0],
    sex: '',
    addresses: '',
    tel: '',
    email: '',
    nationality: '',
    race: '',
    religion: '',
    bloodType: '',
    emergency: {
      fName: '',
      mName: '',
      lName: '',
      tel: '',
      email: '',
      addresses: '',
    },
    relation: '',
  };

  const [data, setData] = useState<PatientData>(NewDoc);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    setData({ ...data, [key]: e.target.value });
  };

  const handleEmergencyChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData({ ...data, emergency: { ...data.emergency, [key]: e.target.value } });
  };


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('data : ', data);

    const outputData = {
    info: {
        fName: data.fName,
        mName: data.mName ? data.mName : null,
        lName: data.lName,
        idNumber: data.idNumber,
        DOB: data.DOB,
        sex: data.sex,
        address: data.addresses,
        tel: data.tel,
        email: data.email,
        nationality: data.nationality,
        race: data.race,
        religion: data.religion,
        bloodType: data.bloodType,
        emergency: {
          fName: data.emergency.fName,
          mName: data.emergency.mName ? data.emergency.mName : null,
          lName: data.emergency.lName,
          tel: data.emergency.tel,
          address: data.emergency.addresses,
          email: data.emergency.email,
        },
        relation: data.relation,
      },
    };

    try {
      console.log('outputData:', outputData);
      const response = await axios.post('http://localhost:3000/api/addPatient', outputData);
      console.log('Response:', response.data);
      alert('Success');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      navigate('/manage_patient', { replace: true });
    }
  };

  function goBack() {
    navigate('/manage_patient', { replace: true });
  }

  return (
    <div className="mx-auto w-1/3">
      <FormWrapper title="Insert Patient">
        <form onSubmit={submit}>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 divider">Personal Information</h3>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.fName}
              onChange={(e) => handleInputChange(e, 'fName')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.mName}
              onChange={(e) => handleInputChange(e, 'mName')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.lName}
              onChange={(e) => handleInputChange(e, 'lName')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Number</label>
            <input required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.idNumber}
              onChange={(e) => handleInputChange(e, 'idNumber')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.DOB}
              onChange={(e) => handleInputChange(e, 'DOB')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.sex}
              onChange={(e) => handleInputChange(e, 'sex')}>
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.addresses}
              onChange={(e) => handleInputChange(e, 'addresses')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.tel}
              onChange={(e) => handleInputChange(e, 'tel')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nationality</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.nationality}
              onChange={(e) => handleInputChange(e, 'nationality')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Race</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.race}
              onChange={(e) => handleInputChange(e, 'race')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Religion</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.religion}
              onChange={(e) => handleInputChange(e, 'religion')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Type</label>
                <select 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={data.bloodType}
                    onChange={(e) => handleInputChange(e, 'bloodType')}
                >
                    <option value="">Select blood type</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                </select>
            </div>      

          <br />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 divider">Emergency Contact</h3>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency Contact Relation</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.relation}
              onChange={(e) => handleInputChange(e, 'relation')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency Contact First Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.emergency.fName}
              onChange={(e) => handleEmergencyChange(e, 'fName')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency Contact Middle Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.emergency.mName}
              onChange={(e) => handleEmergencyChange(e, 'mName')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency Contact Last Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.emergency.lName}
              onChange={(e) => handleEmergencyChange(e, 'lName')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency Contact Phone Number</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.emergency.tel}
              onChange={(e) => handleEmergencyChange(e, 'tel')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency Contact Email</label>
            <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.emergency.email}
              onChange={(e) => handleEmergencyChange(e, 'email')}
            />
          </div>
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency Contact Address</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.emergency.addresses}
              onChange={(e) => handleEmergencyChange(e, 'addresses')}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <button type="button" onClick={goBack} className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Cancel</button>
          </div>
        </form>
      </FormWrapper>
    </div>
  );
}