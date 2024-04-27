import React from 'react'
import FormWrapper from "../FormWrapper";
import { redirect } from 'react-router-dom';

type PersonalInfoRegis = {
  firstName: string;
  lastName: string;
  idNumber: string;
  DOB: Date;
  sex: string;
  address: string;
  tel: string;
  email: string;
  nationality: string;
  race: string;
  religion: string;
  bloodType: string;
}

type PersonalInfoRegisProps = PersonalInfoRegis & {
  updateFields: (fields: Partial<PersonalInfoRegis>) => void;
};

// const handleInputChange = (
//   index: number,
//   field: keyof PersonalInfoRegis[number],
//   value: string
// ) => {
//   setData((prevData) => {
//     const updatedEducation = [...prevData.education];
//     updatedEducation[index][field] = value;
//     return { education: updatedEducation };
//   });
// };

export function PersonalInfoRegis({
  firstName,
  lastName,
  DOB,
  sex,
  address,
  tel,
  email,
  nationality,
  race,
  religion,
  bloodType,
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
          name="firstName"
          value={firstName}
          onChange={(e) => updateFields({ firstName: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="First Name"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => updateFields({ lastName: e.target.value })}
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
          name="birthDate"
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
          name="Sex"
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
          Adress
        </label>
        <input
          type="text"
          name="Adress"
          value={address}
          onChange={(e) => updateFields({ address: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Address"
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tel
        </label>
        <input
          type="text"
          name="Tel"
          value={tel}
          onChange={(e) => updateFields({ tel: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="State"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="text"
          name="Email"
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nationality
        </label>
        <input
          type="text"
          name="Nationality"
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
          name="Race"
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
          name="Religion"
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
        <input
          type="text"
          name="Blood Type"
          value={bloodType}
          onChange={(e) => updateFields({ bloodType: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Blood Type"
        />
      </div>
    </FormWrapper>
  );
}