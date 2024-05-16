import React from 'react'
import FormWrapper from "../FormWrapper";
import { redirect } from 'react-router-dom';

type PersonalInfoRegis = {
  fName: string;
  mName: string;
  lName: string;
  idNumber: string;
  DOB: Date;
  sex: string;
  addresses: string;
  tel: string;
  email: string;
  // pw: string;
  nationality: string;
  race: string;
  religion: string;
  bloodType: string;
  department: string;
  license_id: string;
}

type PersonalInfoRegisProps = PersonalInfoRegis & {
  updateFields: (fields: Partial<PersonalInfoRegis>) => void;
};

export function PersonalInfoRegis({
  fName,
  mName,
  lName,
  DOB,
  sex,
  addresses,
  tel,
  email,
  // pw, 
  nationality,
  race,
  religion,
  bloodType,
  department,
  license_id,
  updateFields,
}: PersonalInfoRegisProps) {
  return (
    <FormWrapper title="1/3 Personal Information">
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First Name
        </label>
        <input
          type="text"
          name="fName"
          value={fName}
          onChange={(e) => updateFields({ fName: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="First Name"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Middle Name
        </label>
        <input
          type="text"
          name="mName"
          value={mName}
          onChange={(e) => updateFields({ mName: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Middle Name"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name
        </label>
        <input
          type="text"
          name="lName"
          value={lName}
          onChange={(e) => updateFields({ lName: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Last Name"
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Birth Date
        </label>
        <input
          type="date"
          name="DOB"
          value={DOB.toISOString().split("T")[0]}
          onChange={(e) =>
            updateFields({ DOB: new Date(e.target.value) })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Sex
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="sex"
          value={sex}
          onChange={(e) => updateFields({ sex: e.target.value })}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Addresses
        </label>
        <input
          type="text"
          name="addresses"
          value={addresses}
          onChange={(e) => updateFields({ addresses: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Addresses"
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tel
        </label>
        <input
          type="text"
          name="tel"
          value={tel}
          onChange={(e) => updateFields({ tel: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tel"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
        />
      </div>
      {/* <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          name="pw"
          value={pw}
          onChange={(e) => updateFields({ pw: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
        />
      </div> */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nationality
        </label>
        <input
          type="text"
          name="nationality"
          value={nationality}
          onChange={(e) => updateFields({ nationality: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nationality"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Race
        </label>
        <input
          type="text"
          name="race"
          value={race}
          onChange={(e) => updateFields({ race: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Race"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Religion
        </label>
        <input
          type="text"
          name="religion"
          value={religion}
          onChange={(e) => updateFields({ religion: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Religion"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Blood Type
        </label>
        <select
          name="blood Type"
          value={bloodType}
          onChange={(e) => updateFields({ bloodType: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="O">O</option>
          <option value="AB">AB</option>
        </select>
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Department
        </label>
        <input
          type="text"
          name="department"
          value={department}
          onChange={(e) => updateFields({ department: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Department"
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          License ID
        </label>
        <input
          type="text"
          name="license_id"
          value={license_id}
          onChange={(e) => updateFields({ license_id: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="License ID"
        />
      </div>
    </FormWrapper>
  );
}