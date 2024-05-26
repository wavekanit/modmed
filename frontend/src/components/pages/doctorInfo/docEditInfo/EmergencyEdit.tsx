import React from "react";
import FormWrapper from "../../FormWrapper";

type EcontactEditData = {
  eConFirstName: string;
  eConMiddleName: string;
  eConLastName: string;
  eConRelation: string;
  eConTel: string;
  eConEmail: string;
  eConAddress: string;
};

type EcontactEditProps = EcontactEditData & {
  updateFields: (fields: Partial<EcontactEditData>) => void;
};

export function EcontactEdit({
  eConFirstName,
  eConMiddleName,
  eConLastName,
  eConRelation,
  eConTel,
  eConEmail,
  eConAddress,
  updateFields, // Add the missing prop here
}: EcontactEditProps) {
  return (
    <FormWrapper title="Emergency Contact">
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          FirstName
        </label>
        <input
          type="text"
          name="eConFirstName"
          value={eConFirstName}
          onChange={(e) => updateFields({ eConFirstName: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="FirstName"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          MiddleName
        </label>
        <input
          type="text"
          name="eConMiddleName"
          value={eConMiddleName}
          onChange={(e) => updateFields({ eConMiddleName: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="MiddleName"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          LastName
        </label>
        <input
          type="text"
          name="eConLastName"
          value={eConLastName}
          onChange={(e) => updateFields({ eConLastName: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="LastName"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Relation
        </label>
        <input
          type="text"
          name="eConRelation"
          value={eConRelation}
          onChange={(e) => updateFields({ eConRelation: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Relation"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tel
        </label>
        <input
          type="text"
          name="eConTel"
          value={eConTel}
          onChange={(e) => updateFields({ eConTel: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tel"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          name="eConEmail"
          value={eConEmail}
          onChange={(e) => updateFields({ eConEmail: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          required
        />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Address
        </label>
        <input
          type="text"
          name="eConAddress"
          value={eConAddress}
          onChange={(e) => updateFields({ eConAddress: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Address"
          required
        />
      </div>
    </FormWrapper>
  );
}
