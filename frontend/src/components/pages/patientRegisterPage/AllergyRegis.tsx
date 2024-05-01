import React from "react";
import FormWrapper from "../FormWrapper";

type AllergyData = {
  allergy: {
    type: string;
    allergen: string;
    status: number;
  }[];
};

type AllergyRegisProps = AllergyData & {
  updateFields: (fields: Partial<AllergyData>) => void;
};

export function AllergyRegis(props: AllergyRegisProps) {
  const [data, setData] = React.useState<AllergyData>(props);

    const handleInputChange = (
        index: number,
        field: keyof AllergyData["allergy"][number],
        value: string
    ) => {
        setData((prevData) => {
            const updatedAllergy = [...prevData.allergy];
            updatedAllergy[index] = {
                ...updatedAllergy[index],
                [field]: value,
            };
            return { allergy: updatedAllergy };
        });
    };
    const handleRemoveClick = (index: number) => {
        const list = [...data.allergy];
        list.splice(index, 1);
        setData({ ...data, allergy: list });
    };
    const handleAddClick = () => {
        setData((prevData) => ({
            allergy: [
                ...prevData.allergy,
                { type: "", allergen: "", status: 0 },
            ],
        }));
    };

  return (
    <FormWrapper title="3/3 Allergy Information">
      {data.allergy.map((x, i) => {
        return (
            <div className="my-2" key={i}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Allergy type
            </label>
            <input
              type="text"
              name="type"
              value={x.type}
              onChange={(e) =>
                handleInputChange(i, "type", e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Allergy type"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Allergen
            </label>
            <input
              type="text"
              name="allergen"
              value={x.allergen}
              onChange={(e) => handleInputChange(i, "allergen", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Allergen"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Status
              </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="status"
              id=""
              value={x.status}
              onChange={(e) => handleInputChange(i, "status", e.target.value)}
            >
              <option value="0">Select</option>
              <option value="1">Not infected</option>
              <option value="2">Infected</option>
            </select>
            <div className="my-2">
              {data.allergy.length !== 1 && (
                <button
                  className="w-1/2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 my-2 mx-2"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {data.allergy.length - 1 === i && (
                <button
                  className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 mx-2"
                  onClick={handleAddClick}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
    </FormWrapper>
  );
}